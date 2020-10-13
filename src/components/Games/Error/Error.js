import React from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const error = (props) => (
    <TransitionGroup className='games__animation'>
        <CSSTransition
            timeout={700}
            classNames="fade"
            unmountOnExit
        >
            <div
                className='games__error nes-container is-rounded is-dark nes-pointer'
                 style={`${props.width < 768}` ? props.mobile : props.desktop}>
                <h2>No results.</h2>
            </div>
        </CSSTransition>
    </TransitionGroup>
);

export default error;

