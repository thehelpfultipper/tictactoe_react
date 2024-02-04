import { useEffect, useState, useContext } from 'react';

import Card from '../UI/Card';
import Players from './Players';
import BoardGrid from './BoardGrid';
import Status from './Status';
import GameContext from '../../context/game-context';

import s from './Board.module.css';

export default function GameBoard() {
    let [board, setBoard] = useState(Array(9).fill(''));
    let [isHuman, setIsHuman] = useState(false);
    let [currentPlayer, setCurrentPlayer] = useState(null);
    const [winner, setWinner] = useState(null);

    const {players, resetBoard, setResetBoard} = useContext(GameContext);
    const {human, computer} = players;

    const checkWinner = () => false;

    const computerMove = (currentBoard) => {
        const emptyCells = currentBoard.reduce((acc, cell, index) => {
          if (!cell) acc.push(index);
          return acc;
        }, []);
    
        let bestMove = false;
        for (let i = 0; i < emptyCells.length; i++) {
          const testBoard = [...currentBoard];
          testBoard[emptyCells[i]] = computer.symbol;
          if (checkWinner(testBoard) === computer.symbol) {
            bestMove = emptyCells[i];
            break;
          }
        }
    
        if (!bestMove) {
          for (let i = 0; i < emptyCells.length; i++) {
            const testBoard = [...currentBoard];
            testBoard[emptyCells[i]] = human.symbol;
            if (checkWinner(testBoard) === human.symbol) {
              bestMove = emptyCells[i];
              break;
            }
          }
        }
    
        if (!bestMove) {
          const centerIndex = 4;
          if (emptyCells.includes(centerIndex)) {
            bestMove = centerIndex;
          } else {
            const cornerIndices = [0, 2, 6, 8];
            const emptyCorners = emptyCells.filter(cell => cornerIndices.includes(cell));
            if (emptyCorners.length > 0) {
              const randomCornerIndex = Math.floor(Math.random() * emptyCorners.length);
              bestMove = emptyCorners[randomCornerIndex];
            } else {
              const randomIndex = Math.floor(Math.random() * emptyCells.length);
              bestMove = emptyCells[randomIndex];
            }
          }
        }
    
        const newBoard = [...currentBoard];
        newBoard[bestMove] = computer.symbol;
    
        setBoard(newBoard);
        // checkWinner(newBoard);
        setIsHuman(true);
        setCurrentPlayer(human.symbol);
      };

    const cellClickHandler = (index) => {
        // Check if cell is played or there's winner
        if (board[index] || winner || !isHuman) return;

        console.log('CELL CLICKED: ', index);
        console.log(human.symbol)
        // Copy of new board to update existing
        const newBoard = [...board];
        newBoard[index] = human.symbol;
        setBoard(newBoard);

        // checkWinner(newBoard);
        setCurrentPlayer(computer.symbol);

        if (!winner) {
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
            console.log('COMPUTER GOES FIRST')
            setTimeout(() => {
                computerMove([...board]);
            }, 500);

            setCurrentPlayer(human.symbol);
            setIsHuman(true);
        }
    };


    const resetGame = () => {
        // Reset player score
        // let newGameScore = {
        //     ...players,
        //     human: { ...human, score: 0 },
        //     computer: { ...computer, score: 0 }
        // }
        setBoard(Array(9).fill(null));
        // setWinner(null);
        // setPlayers(newGameScore);
        startingPlayer();
    };

    useEffect(() => {
        // Select random player to start on mount
        startingPlayer();
    }, []);

    useEffect(() => {
        // console.log(resetBoard)
        resetBoard && resetGame();
        setResetBoard(false);
    }, [resetBoard]);

    return (
        <Card className={s["board-wrapper"]}>
            <Players current={currentPlayer} />
            <BoardGrid board={board} onCellClick={cellClickHandler} />
            <Status cPlayer={currentPlayer} />
        </Card>
    )
}