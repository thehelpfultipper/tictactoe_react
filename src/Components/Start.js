import { useContext } from "react";

import Button from "./UI/Button";
import Header from './Layout/Header';
import GameContext from "../context/game-context";
import Select from './Select/Select';
import GameScreen from "./GameScreen";

import s from './Start.module.css';

export default function Start() {
    const { isGameOn, setIsGameOn, startGame } = useContext(GameContext);

    const playBtnHandler = () => setIsGameOn(true);

    return (
        <>
            <header className={s["Start-header"]}>
                <Header gameOn={isGameOn} />
                {isGameOn ?
                    (
                        startGame ?
                            <GameScreen /> :
                            <Select />
                    ) :
                    <Button
                        role="button"
                        onClick={playBtnHandler}
                        active
                    >
                        Play
                    </Button>
                }
            </header>
        </>
    )
}