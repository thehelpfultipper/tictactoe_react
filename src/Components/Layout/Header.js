import { Fragment } from 'react';

import logo from '../../Assets/logo.svg';

import s from './Header.module.css';

export default function Header({gameOn}) {
    return (
        <Fragment>
            <div className={`${s["logo-wrapper"]}${gameOn ? ` ${s["logo-sm"]}` : ''}`}>
                <img src={logo} className={s["Start-logo"]} alt="logo" />
            </div>
            <h1 className={`${s["Start-h1"]}${gameOn ? ` ${s["h1-sm"]}` : ''}`}>
                <span className={s["h1-reduced"]}>PinkPanda</span>
                Tic•Tac•Toe
            </h1>
        </Fragment>
    )
}