import React, { useContext } from 'react';
import classNames from 'classnames';

import GameContext from '../../context/game-context';

import s from './Board.module.css';

function shortenPlayerName(name) {
    if(name.length > 10) {
        return name.slice(0, 10) + '...';
    } else {
        return name;
    }
}

export default function Players({current}) {
    const {
        players: {
            human: {
                name: hname,
                symbol: hsym 
            },
            computer: {
                name: cname, 
                symbol: csym 
            } 
        } 
    } = useContext(GameContext);

    return (
        <div className={s.players}>
            <ul className={s["players-list"]}>
                <li className={current===hsym ? `${s.active}` : ''}>
                    <span>{shortenPlayerName(hname)}</span> plays <span className={s["player-sym"]}>{hsym}</span>
                </li>
                <li className={current===csym ? `${s.active}` : ''}>
                    <span>{cname}</span> plays <span className={s["player-sym"]}>{csym}</span>
                </li>
            </ul>
        </div>
    )
}
