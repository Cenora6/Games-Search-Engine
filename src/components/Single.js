import React from 'react';
import {AnimateOnChange} from "@nearform/react-animation";

function Single({showDetails, details}) {
    const objectLength = Object.keys(details).length;
    // console.log(details.cover)

    // if(details.ageRating.category !== undefined) {
    //     console.log(details.ageRating.category)
    // }

    // if(details.ageRating !== undefined) {
    //     console.log(details.ageRating)
    //     console.log(details.ageCategory)
    // }
    return (
        <AnimateOnChange
            durationOut="500"
            animationIn="fadeIn"
            animationOut="fadeOut"
            className="games__animation"
        >

            <section className='single nes-container is-rounded is-dark' style={{display: `${showDetails ? 'flex' : 'none'}`}}>
                <h2>{details.name}</h2>
                <div className='single__details' style={{display: 'flex'}}>
                    <div className='single__details__image'>
                        <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${details.cover}.jpg`} alt='game_cover'/>
                        <div className='single__details__image__age'>
                            <p><span className='title'>Age Rating:</span>

                            </p>
                            {/*{details.ageRating.category.map( (rating) => {*/}
                            {/*    return (*/}
                            {/*        rating*/}
                            {/*    )*/}
                            {/*})}*/}
                            {/*    {details.ageRating.category.map( (rating) => {*/}
                            {/*        return (*/}
                            {/*            rating*/}
                            {/*        )*/}
                            {/*    })}*/}
                            {/*</span>*/}
                        </div>
                    </div>
                    <div className='single__details__text'>
                        <p><span className='title'>Summary:</span> {details.summary}</p>
                        {/*<p><span className='title'>Alternative Names:</span>*/}
                        {/*    {details.alternativeNames.map( (name) => {*/}
                        {/*        return (*/}
                        {/*            {name}*/}
                        {/*        )*/}
                        {/*    })}</p>*/}
                    </div>
                </div>

            </section>

        </AnimateOnChange>

    );
}

export default Single;
