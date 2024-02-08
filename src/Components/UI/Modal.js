import React from 'react';

import s from './Modal.module.css';

function Overlay() {
    return(
        <div className={s.backdrop}></div>
    )
}

function OverlayContent(props) {
    return (
        <div className={s.overlay}>
            {props.children}
        </div>
    )
}

export default function Modal(props) {
  return (
    <>
      <Overlay />
      <OverlayContent>{props.children}</OverlayContent>
    </>
  )
}
