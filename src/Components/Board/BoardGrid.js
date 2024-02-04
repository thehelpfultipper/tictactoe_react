import React, { useContext } from 'react';

import GameContext from '../../context/game-context';

import s from  './Board.module.css';

export default function BoardGrid({board, onCellClick}) {
    return (
        <div className={s.board}>
            {
                board.map((cell, index) => {
                    return <div
                        className={`${s.cell}`}
                        key={index}
                        onClick={() => onCellClick(index)}
                    >{cell}</div>
                })
            }
        </div>
    )
}
