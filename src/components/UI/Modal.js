import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = props => {
    return (
        <div className={classes.backdrop} onClick={props.onCloseCart}></div>
    );
}

const ModalOverlay = props => {
    return (
        <div className={classes.modal}>{props.children}</div>
    );
}

const Modal = props => {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onCloseCart={props.onCloseCart}></Backdrop>, document.getElementById('overlay'))}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, document.getElementById('overlay'))}
        </>
    )
}

export default Modal;