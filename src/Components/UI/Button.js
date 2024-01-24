import {PropTypes} from 'prop-types';

import s from './Button.module.css';

function Button({active, children, ...props}) {
    return (
        <button
            className={`${s.Btn} ${active ? s["Btn-active"] : s["Btn-regular"]}`}
            {...props}
        >
            {children}
        </button>
    )
}

Button.propTypes = {
    active: PropTypes.bool.isRequired
}

export default Button;