import React from 'react';
import {
    CSSTransition,
    TransitionGroup
} from 'react-transition-group';
import Details from './Details/Details';
import Title from './Title/Title';

function single ({showDetails, details, handleCloseDetails}) {

    return (
        <TransitionGroup className='animation'>
            <CSSTransition
                in={showDetails}
                timeout={700}
                classNames="fade"
                key={showDetails}>

                <section
                    className='single nes-container is-rounded is-dark'
                    style={{display: `${showDetails ? 'flex' : 'none'}`}}>

                    <Title details={details} close={handleCloseDetails}/>

                    <Details details={details}/>

                </section>

            </CSSTransition>
        </TransitionGroup>

    );
}

export default single;
