import React from 'react';
import {AnimateOnChange} from "@nearform/react-animation";

function Single({showDetails}) {


    return (
        <AnimateOnChange
            durationOut="500"
            animationIn="fadeIn"
            animationOut="fadeOut"
            className="games__animation"
        >
            <section className='single nes-container is-rounded is-dark' style={{display: `${showDetails ? 'flex' : 'none'}`}}>
                {/*<img src={image}/>*/}

            </section>
        </AnimateOnChange>

    );
}

export default Single;
