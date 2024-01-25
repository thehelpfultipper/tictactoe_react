
import logo from '../../logo.svg';
import Button from "../UI/Button";

import s from './Start.module.css';

export default function Start() {
    return (
        <header className={s["Start-header"]}>
            <div className={s["logo-wrapper"]}>
                <img src={logo} className={s["Start-logo"]} alt="logo" />
            </div>
            <h1 className={s["Start-h1"]}>
                <span className={s["h1-reduced"]}>PinkPanda</span>
                Tic•Tac•Toe
            </h1>
            <Button
                role="button"
                active
            >
                Play
            </Button>
        </header>
    )
}