import React from 'react';

import s from './Board.module.css';

export default function Status({cPlayer}) {
    return (
        <div className={s.status}>
            Player {cPlayer}'s turn
        </div>
    )
}
