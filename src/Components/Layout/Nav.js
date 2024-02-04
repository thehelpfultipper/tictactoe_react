import { useContext } from 'react';

import s from './Nav.module.css';

import backArrow from '../../Assets/back-arrow.svg';
import exitIcon from '../../Assets/exit-icon.svg';
import Button from '../UI/Button';
import GameContext from '../../context/game-context';

export default function Nav({ isSelect, player, ...props }) {
    let { setShowBoard, setPlayers, setIsGameOn, setStartGame, setResetBoard } = useContext(GameContext);

    const backArrowHandler = () => {
        props.onBack(true);
        props.onBackAction();
    }

    const endGameHandler = () => {
        setIsGameOn(false);
        setPlayers({});
        setShowBoard(false);
        setStartGame(false);
    }

    const cardNav = <div className={`${s["Nav-wrapper"]}${!player ? ` ${s["flx-end"]}` : ''}`}>
        {
            player &&
            <div
                className={`${s["nav-back"]} ${s["nav-icon"]}`}
                onClick={backArrowHandler}
            >
                <img src={backArrow} alt='Back arrow' /> <span className={s["back-txt"]}>Back</span>
            </div>
        }
        <div
            className={`${s["nav-exit"]} ${s["nav-icon"]}`}
            onClick={() => { props.onExit(true) }}
        >
            <img src={exitIcon} alt='Exit icon' />
        </div>
    </div>;

    const gameNav = <div className={`${s["Nav-wrapper"]}`}>
        <Button
            role='button'
            active={false}
            cs={`${s["reset-btn"]} ${s["nav-btn"]}`}
            onClick={() => setResetBoard(true)}
        >Reset</Button>
        <Button
            role='button'
            active={false}
            cs={`${s["end-btn"]} ${s["nav-btn"]}`}
            onClick={endGameHandler}
        >End</Button>
    </div>

    return (
        <nav>
            {
                isSelect ?
                    cardNav :
                    gameNav
            }
        </nav>
    )
}