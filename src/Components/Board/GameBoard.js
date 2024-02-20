import { useEffect, useState, useContext, useCallback } from 'react';

import Card from '../UI/Card';
import Players from './Players';
import BoardGrid from './BoardGrid';
import Status from './Status';
import GameContext from '../../context/game-context';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import ScoreBoard from './ScoreBoard';

import s from './Board.module.css';

export default function GameBoard(props) {
    let [board, setBoard] = useState(Array(9).fill(''));
    let [isHuman, setIsHuman] = useState(false);
    let [currentPlayer, setCurrentPlayer] = useState(null);
    let [winner, setWinner] = useState(null);
    let [isCellActive, setIsCellActive] = useState(false);
    let [cell, setCell] = useState([]);

    const { players, setPlayers, resetBoard, setResetBoard } = useContext(GameContext);
    const { human, computer } = players;

    const checkWinner = (currentBoard) => {
        const winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (let condition of winningConditions) {
            const [a, b, c] = condition;

            if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
                // console.log('winning condition: ' + condition)

                return currentBoard[a];
            }
        }

        if (currentBoard.every(cell => cell)) {
            setWinner('draw');
            // console.log('DRAW')
            return 'draw';
        }

        return null;
    };

    const computerMove = (currentBoard) => {
        const emptyCells = currentBoard.reduce((acc, cell, index) => {
            if (!cell) acc.push(index);
            return acc;
        }, []);

        let bestMove;
        for (let i = 0; i < emptyCells.length; i++) {
            const testBoard = [...currentBoard];
            testBoard[emptyCells[i]] = computer.symbol;
            if (checkWinner(testBoard) === computer.symbol) {
                bestMove = emptyCells[i];
                // console.log('BEST MOVE')
                break;
            }
        }

        if (!bestMove) {
            for (let i = 0; i < emptyCells.length; i++) {
                const testBoard = [...currentBoard];
                testBoard[emptyCells[i]] = human.symbol;
                if (checkWinner(testBoard) === human.symbol) {
                    bestMove = emptyCells[i];
                    // console.log('BEST MOVE to BLOCK')
                    break;
                }
            }
        }

        if (!bestMove) {
            const centerIndex = 4;
            if (emptyCells.includes(centerIndex)) {
                bestMove = centerIndex;
                // console.log('BEST MOVE to CENTER')
            } else {
                const cornerIndices = [0, 2, 6, 8];
                const emptyCorners = emptyCells.filter(cell => cornerIndices.includes(cell));
                if (emptyCorners.length > 0) {
                    const randomCornerIndex = Math.floor(Math.random() * emptyCorners.length);
                    bestMove = emptyCorners[randomCornerIndex];
                    // console.log('BEST MOVE at CORNER')

                } else {
                    const randomIndex = Math.floor(Math.random() * emptyCells.length);
                    bestMove = emptyCells[randomIndex];
                    // console.log('BEST MOVE at RANDOM')

                }
            }
        }

        const newBoard = [...currentBoard];
        newBoard[bestMove] = computer.symbol;
        setBoard(newBoard);

        // Check if the move results in a win for the computer or a draw
        const winner = checkWinner(newBoard);
        if (winner === computer.symbol) {
            setWinner(computer.symbol);
            setPlayers({
                ...players,
                computer: {
                    ...computer,
                    score: computer.score + 1
                }
            });
            props.rounds.setRounds(prev => prev + 1);
            // console.log('computerMove winner')
        } else if (winner === 'draw') {
            setWinner('draw');
            props.rounds.setRounds(prev => prev + 1)

            // console.log('computerMove draw')
        }

        // setIsHuman(true);

        // checkWinner(newBoard);
        // setIsHuman(true);
        setCurrentPlayer(human.symbol);
    };

    const cellClickHandler = (index, cell) => {
        // Check if cell is played or there's winner
        if (board[index] || winner || !isHuman) return;

        // console.log('CELL CLICKED: ', index);
        // Copy of new board to update existing
        const newBoard = [...board];
        newBoard[index] = human.symbol;
        setBoard(newBoard);

        setCurrentPlayer(computer.symbol);
        // console.log('running checkWinner after player click:')

        if (checkWinner(newBoard) === human.symbol) {
            setWinner(human.symbol);
            setPlayers({
                ...players,
                human: {
                    ...human,
                    score: human.score + 1
                }
            });
            props.rounds.setRounds(prev => prev + 1)
            // console.log('human winner')
        }
        else {
            // console.log('no winner after click, play computer')
            setTimeout(() => {
                computerMove([...newBoard]);
            }, 500);
        }
    };

    const startingPlayer = () => {
        const randomStarter = Math.random() < 0.5 ? 'X' : 'O';
        setIsHuman(randomStarter === human.symbol);
        setCurrentPlayer(randomStarter);

        if (randomStarter === computer.symbol) {
            // console.log('COMPUTER GOES FIRST')
            setTimeout(() => {
                computerMove([...board]);
            }, 500);

            setCurrentPlayer(human.symbol);
            setIsHuman(true);
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setWinner(null);
        setIsHuman(false);
        setCurrentPlayer(null);
        startingPlayer();
        setIsCellActive(false);
        setCell(null);
    };

    const resetGameBoard = useCallback(() => {
        // console.log('Resetting board...');
        setResetBoard(false);
        resetGame();
    }, []);

    const drawModal = winner !== 'draw' ?
        <p>
            {
                winner === human.symbol ?
                    `👤 ${human.name}` :
                    `🤖 ${computer.name}`
            }
            {" "} won!
        </p> :
        <p>It's a draw ⚖️</p>;

    const gameOverModal = <Modal>
        <p className={s["modal-title"]}>Game Over</p>
        {drawModal}
        <Button
            active={false}
            cs={s["rematch-btn"]}
            onClick={() => setResetBoard(true)}
        >Rematch</Button>
    </Modal>;

    useEffect(() => {
        // Select random player to start on mount
        startingPlayer();
    }, []);

    useEffect(() => {
        // console.log('Running reset')
        if (resetBoard) {
            resetGameBoard();
            setIsCellActive(false);
            cell.forEach(item=>item.classList.remove(s.active));
            setCell([]);
        } else {
            return;
        }

    }, [resetBoard, resetGameBoard]);

    useEffect(()=>{
        if(cell.length===0) return;
        if(isCellActive) {
            cell.forEach(item => item.textContent===human.symbol && item.classList.add(s.active));
        } else {
            cell.forEach(item => item.classList.remove(s.active));
        }
    }, [isCellActive, cell]);

    return (
        <Card className={s["board-wrapper"]}>
            {winner && winner !== null ? gameOverModal : null}
            {props.isEnd ? <ScoreBoard rounds={props.rounds} onEnd={props.onEndGame} /> : null}
            <Players current={currentPlayer} />
            <Status cPlayer={currentPlayer} winner={winner} />
            <BoardGrid board={board} onCellClick={cellClickHandler} onCellActive={setIsCellActive} onSetCell={setCell} />
        </Card>
    )
}