
import { useState } from "react";
import Button from "../UI/Button";

import s from './DefaultSelection.module.css';

export default function DefaultSelection({ onPlayerSelect }) {
    let [activeBtn, setActiveBtn] = useState(null);

    const playerSelectionHandler = (e) => {
        const target = e.target;
        const currentPlayer = target.value;

        setActiveBtn(currentPlayer);

        onPlayerSelect(currentPlayer);
    }

    return (
        <div className={s.selection}>
            <Button
                active={activeBtn === 'X'}
                cs={s.player}
                value='X'
                role='button'
                onClick={playerSelectionHandler}>X</Button>
            <strong>OR</strong>
            <Button
                active={activeBtn === 'O'}
                cs={s.player}
                value='O'
                role='button'
                onClick={playerSelectionHandler}>O</Button>
        </div>
    );
}