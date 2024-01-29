
import Button from '../UI/Button';

import s from './Nav.module.css';
import backArrow from '../../Assets/back-arrow.svg';
import exitIcon from '../../Assets/exit-icon.svg';

export default function Nav({ isSelect, player, ...props }) {
    const cardNav = <div className={`${s["Nav-wrapper"]}${!player ? ` ${s["flx-end"]}` : ''}`}>
        {
            player &&
                <div 
                    className={`${s["nav-back"]} ${s["nav-icon"]}`}
                    onClick={()=>props.onBack(true)}
                >
                    <img src={backArrow} alt='Back arrow' /> <span className={s["back-txt"]}>Back</span>
                </div>
        }
        <div 
            className={`${s["nav-exit"]} ${s["nav-icon"]}`}
            onClick={()=>{props.onExit(true)}}
        >
            <img src={exitIcon} alt='Exit icon' />
        </div>
    </div>;

    return (
        <nav>
            {
                isSelect ?
                    cardNav :
                    <Button>BUTTON</Button>
            }
        </nav>
    )
}