import { useContext, useEffect, useRef, useState } from 'react';

import Card from './UI/Card';
import Nav from './Layout/Nav';
import GameBoard from './Board/GameBoard';
import GameContext from '../context/game-context';

import s from './GameScreen.module.css';

export default function GameScreen() {
    let [endGame, setEndGame] = useState(false);

    const {startGame} = useContext(GameContext);

    const navWrapRef = useRef(null);

    useEffect( ()=>{
        navWrapRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [startGame]);

    return (
        <div ref={navWrapRef}>
            <Card className={s["game-nav-wrapper"]}>
                <Nav onEndGame={setEndGame} />
            </Card>
            <GameBoard isEnd={endGame} onEndGame={setEndGame} />
        </div>
    )
}