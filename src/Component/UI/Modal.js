import React from 'react';
import ReactDOM from 'react-dom';
import classess from './Modal.module.css';
export default function Modal(props){
    const overlay=document.getElementById("overlays");
    return(
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, overlay)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children} </ModalOverlay>, overlay)}
        </React.Fragment>
    )
}
export function Backdrop(props){
    return(
        <div className={classess.backdrop} onClick={props.onClose}>

        </div>
    )
}
export function ModalOverlay(props){
    return(
        <div className={classess.modal}>
            <div className={classess.content}>{props.children}</div>
        </div>
    )
}