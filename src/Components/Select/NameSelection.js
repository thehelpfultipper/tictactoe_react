import s from './NameSelection.module.css';

export default function NameSelection({ onNameSelect }) {
    return (
        <div className={s["input-wrapper"]}>
            <input
                type='text'
                className={s["name-input"]}
                placeholder='Enter your name...'
                onInput={(e) => onNameSelect((e.target.value).trim())}
            />
        </div>
    )
}