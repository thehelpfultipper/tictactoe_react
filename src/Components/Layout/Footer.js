
import s from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={s["Foot"]}>
            <div className={s["foot-1"]}>
                With 🤍 from <a
                    className={s["Foot-link"]}
                    href="https://thehelpfultipper.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >The Helpful Tipper</a>
            </div>
            <div className={s["foot-2"]}>
                ©{new Date().getFullYear()}, The Helpful Tipper. All Rights Reserved.
            </div>
        </footer>
    )
}