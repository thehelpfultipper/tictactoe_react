import { PropTypes } from 'prop-types';

import s from './Button.module.css';

function Button({ active, children, ...props }) {
    // @props.cs refers to 'custom styles' 
    return (
        <button
            className={`${s.Btn} ${active ? s["Btn-active"] : s["Btn-default"]}${props.cs ? ` ${props.cs}` : ''}`}
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