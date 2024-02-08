import React from 'react';

import s from './Board.module.css';

export default function Status({cPlayer, winner}) {
    return (
        <div className={s.status}>
            {`Player ${cPlayer}'s turn`}
            {/* {
                winner && winner!==null ? 
                    // Check winner isn't draw
                    (
                        winner==='draw' ?
                        'Game is at a DRAW' :
                         `Winner is ${winner}!!`
                    ) :
                    `Player ${cPlayer}'s turn`
            } */}
        </div>
    )
}
