import { useContext, useEffect, useRef } from 'react';

import Card from './UI/Card';
import Nav from './Layout/Nav';
import GameBoard from './Board/GameBoard';
import GameContext from '../context/game-context';

import s from './GameScreen.module.css';

export default function GameScreen() {
    const {startGame} = useContext(GameContext);

    const navWrapRef = useRef(null);

    useEffect( ()=>{
        navWrapRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [startGame]);

    return (
        <div ref={navWrapRef}>
            <Card className={s["game-nav-wrapper"]}>
                <Nav />
            </Card>
            <GameBoard />
        </div>
    )
}