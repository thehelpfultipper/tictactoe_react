import React from 'react';
import { useContext } from 'react';

import Modal from '../UI/Modal';
import Button from '../UI/Button';
import GameContext from '../../context/game-context';

import s from './Board.module.css';

export default function ScoreBoard(props) {
    const { players, setIsGameOn, setPlayers, setShowBoard, setStartGame } = useContext(GameContext);

    const { human, computer } = players;
    const { rounds, setRounds } = props.rounds;

    const calcDraws = () => {
        let totalDraws = rounds - (human.score + computer.score);
        if(totalDraws < 0) return 0;
        return totalDraws;
    }
    const endGameHandler = () => {
        props.onEnd(false);
        setRounds(0);
        setIsGameOn(false);
        setPlayers({});
        setShowBoard(false);
        setStartGame(false);
    }

    return (
        <Modal>
            <p className={s["modal-title"]}>Score Board</p>
            <div className={s["score-board"]}>
                <ul className={s.stats}>
                    <li>Rounds played: <span className={s.emp}>{rounds}</span></li>
                    <li>Draws: <span className={s.emp}>{calcDraws()}</span></li>
                </ul>
                <ul className={s.playerStats}>
                    <li><span className={s.emp}>{human.name}</span> won <span className={s.emp}>{human.score}</span></li>
                    <li><span className={s.emp}>{computer.name}</span> won <span className={s.emp}>{computer.score}</span></li>
                </ul>
            </div>
            <Button
                active={false}
                // cs={s["rematch-btn"]}
                onClick={endGameHandler}
            >Start Over</Button>
        </Modal>
    )
}
