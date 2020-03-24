import React from 'react';
import {AnimateOnChange} from "@nearform/react-animation";
import exit from "./../assets/xmark.svg";

function Single({showDetails, details, handleCloseDetails}) {
    const objectLength = Object.keys(details).length;
    console.log(details)


    // if(details.ageRating.category !== undefined) {
    //     console.log(details.ageRating.category)
    // }

    // if(details.ageRating !== undefined) {
    //     console.log(details.ageRating)
    //     console.log(details.ageCategory)
    // }


    if(details.company) {
        console.log(details.company)
    }
    return (
        <AnimateOnChange
            durationOut="500"
            animationIn="fadeIn"
            animationOut="fadeOut"
            className="games__animation"
        >

            <section className='single nes-container is-rounded is-dark' style={{display: `${showDetails ? 'flex' : 'none'}`}}>
                <div className='single__title'>
                    <h2>{details.name}</h2>
                    <img className="nes-avatar nes-pointer" alt="exit details" src={exit} style={{imageRendering: "pixelated"}}
                         onClick={handleCloseDetails}/>
                </div>
                <div className='single__details'>
                    <div className='single__details__image'>
                        <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${details.cover}.jpg`} alt='game_cover'/>
                        <div className='single__details__image__age'>

                            {details.alternativeNames &&
                            <div className='text'>
                                <span className='title'>Alternative names:</span>
                                <p>
                                    {details.alternativeNames.map( (name) => <span>{name} | </span>)}
                                </p>
                            </div>
                            }

                            {(details.ageCategory && details.ageRating) &&
                            <div className='text age_rating'>
                                <span className='title'>Age Rating:</span>
                                <div className='age_rating__text'>
                                    <p>
                                        {details.ageCategory.map( (ageCategory) => <span>{ageCategory}</span>)}
                                    </p>
                                    <p>
                                        {details.ageRating.map((ageRating) => <span>{ageRating}  </span>)}
                                    </p>
                                </div>
                            </div>
                            }

                            {details.company &&
                            <div className='text'>
                                <span className='title'>Company:</span>
                                <p>
                                    {details.company.map((company) => <span>{company} | </span>)}
                                </p>
                            </div>
                            }

                            {details.mode &&
                            <div className='text'>
                                <span className='title'>Mode:</span>
                                <p>
                                    {details.mode.map((mode) => <span>{mode} | </span>)}
                                </p>
                            </div>
                            }

                            {details.mode &&
                            <div className='text'>
                                <span className='title'>Genre:</span>
                                <p>
                                    {details.genre.map((genre) => <span>{genre} | </span>)}
                                </p>
                            </div>
                            }

                            {details.releaseDate &&
                            <div className='text'>
                                <span className='title'>Release year:</span>
                                <p>
                                    <span>{details.releaseDate[0]}</span>
                                </p>
                            </div>
                            }

                            {details.themes &&
                            <div className='text'>
                                <span className='title'>Themes:</span>
                                <p>
                                    {details.themes.map((theme) => <span>{theme} | </span>)}
                                </p>
                            </div>
                            }
                        </div>
                    </div>
                    <div className='single__details__text'>
                        <span className='title'>Summary:</span>
                        <p> {details.summary}</p>
                    </div>
                    {/*{details.themes.length > 0 &&*/}
                    {/*<div className='single__details__themes'>*/}
                    {/*    <span className='title'>Themes:</span>*/}
                    {/*    <p>{details.themes.map( (theme) => {*/}
                    {/*        return (*/}
                    {/*            theme*/}
                    {/*        )*/}
                    {/*    })}</p>*/}
                    {/*</div>*/}
                    {/*}*/}
                </div>

            </section>

        </AnimateOnChange>

    );
}

export default Single;
