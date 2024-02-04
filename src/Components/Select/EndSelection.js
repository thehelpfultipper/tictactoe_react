
import { useContext } from 'react';

import s from './EndSelection.module.css';

import GameContext from '../../context/game-context';
import Button from '../UI/Button';

export default function EndSelection() {
    const { players, setStartGame } = useContext(GameContext);

    return (
        <div className={s["EndSelection-wrapper"]}>
            <p className={s["player-name"]}>
                <strong>{players.human.name}</strong> vs <strong>{players.computer.name}</strong>
            </p>
            <Button active role='button' onClick={() => setStartGame(true)}>Game On</Button>
        </div>
    );
}