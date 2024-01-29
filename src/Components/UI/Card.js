
import s from './Card.module.css';

export default function Card({children, className}) {
    return (
        <div className={`${s["Card-default"]}${className ? ` ${className}` : ''}`}>{children}</div>
    )
}