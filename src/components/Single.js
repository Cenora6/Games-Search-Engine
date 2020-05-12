import React from 'react';
import {
    CSSTransition,
    TransitionGroup
} from 'react-transition-group';

import exit from "./../assets/xmark.svg"

function Websites({details}) {
    const urls = details.websitesUrl;

    return (
        <span className='single__details__image__single__websites'>
                {urls.map( (url, index) => {
                    if(url.indexOf("facebook") !== -1) {
                        return (
                            <a href={`${url}`} target="_blank" rel="noopener noreferrer" key={index} key={index}>
                                <i className="fab fa-facebook-f" title='facebok'></i>
                            </a>
                        )
                    } else if (url.indexOf("wiki") !== -1 && url.indexOf("wikipedia") === -1) {
                        return (
                            <a href={`${url}`} target="_blank" rel="noopener noreferrer" key={index}>
                                <i className="fas fa-file-alt" title="wikia"></i>
                            </a>
                        )
                    } else if (url.indexOf("wikipedia") !== -1) {
                        return (
                            <a href={`${url}`} target="_blank" rel="noopener noreferrer" key={index}>
                                <i className="fab fa-wikipedia-w" title="wikipedia"></i>
                            </a>
                        )
                    } else if (url.indexOf("twitter") !== -1) {
                        return (
                            <a href={`${url}`} target="_blank" rel="noopener noreferrer" key={index}>
                                <i className="fab fa-twitter" title="twitter"></i>
                            </a>
                        )
                    } else if (url.indexOf("twitch") !== -1) {
                        return (
                            <a href={`${url}`} target="_blank" rel="noopener noreferrer" key={index}>
                                <i className="fab fa-twitch" title="twitch"></i>
                            </a>
                        )
                    } else if (url.indexOf("instagram") !== -1) {
                        return (
                            <a href={`${url}`} target="_blank" rel="noopener noreferrer" key={index}>
                                <i className="fab fa-instagram" title="instagram"></i>
                            </a>
                        )
                    } else if (url.indexOf("youtube") !== -1) {
                        return (
                            <a href={`${url}`} target="_blank" rel="noopener noreferrer" key={index}>
                                <i className="fab fa-youtube" title="youtube"></i>
                            </a>
                        )
                    } else if (url.indexOf("iphone") !== -1) {
                        return (
                            <a href={`${url}`} target="_blank" rel="noopener noreferrer" key={index}>
                                <i className="fas fa-mobile-alt" title="iphone"></i>
                            </a>
                        )
                    } else if (url.indexOf("ipad") !== -1) {
                        return (
                            <a href={`${url}`} target="_blank" rel="noopener noreferrer" key={index}>
                                <i className="fas fa-tablet-alt"  title="ipad"></i>
                            </a>
                        )
                    } else if (url.indexOf("android") !== -1) {
                        return (
                            <a href={`${url}`} target="_blank" rel="noopener noreferrer" key={index}>
                                <i className="fab fa-android" title="android"></i>
                            </a>
                        )
                    } else if (url.indexOf("steam") !== -1) {
                        return (
                            <a href={`${url}`} target="_blank" rel="noopener noreferrer" key={index}>
                                <i className="fab fa-steam" title="steam"></i>
                            </a>
                        )
                    } else if (url.indexOf("reddit") !== -1) {
                        return (
                            <a href={`${url}`} target="_blank" rel="noopener noreferrer" key={index}>
                                <i className="fab fa-reddit"  title="reddit"></i>
                            </a>
                        )
                    } else if (url.indexOf("itch") !== -1) {
                        return (
                            <a href={`${url}`} target="_blank" rel="noopener noreferrer" key={index}>
                                <i className="fab fa-itch-io"  title="itch"></i>
                            </a>
                        )
                    } else if (url.indexOf("epicgames") !== -1) {
                        return (
                            <a href={`${url}`} target="_blank" rel="noopener noreferrer" key={index}>
                                <i className="fas fa-gamepad" title='epic games'></i>
                            </a>
                        )
                    } else if (url.indexOf("gog") !== -1) {
                        return (
                            <a href={`${url}`} target="_blank" rel="noopener noreferrer" key={index}>
                                <i className="fas fa-ghost" title='gog'></i>
                            </a>
                        )
                    } else {
                        return (
                            <a href={`${url}`} target="_blank" rel="noopener noreferrer" key={index}>
                                <i className="fas fa-check-double" title="official"></i>
                            </a>
                        )
                    }

                })}

            </span>
    )
}

function Single({showDetails, details, handleCloseDetails}) {

    return (
        <TransitionGroup className='animation'>
            <CSSTransition
                in={showDetails}
                timeout={700}
                classNames="fade"
                key={showDetails}
            >

                <section className='single nes-container is-rounded is-dark' style={{display: `${showDetails ? 'flex' : 'none'}`}}>
                    <div className='single__title'>
                        <h2>{details.name}</h2>
                        <img className="nes-avatar nes-pointer" alt="exit details" src={exit} style={{imageRendering: "pixelated"}}
                             onClick={handleCloseDetails}/>
                    </div>
                    <div className='single__details'>
                        <div className='single__details__image'>
                            <div className='single__details__image__single'>
                                <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${details.cover}.jpg`} alt='game_cover'/>

                                {details.websitesUrl &&
                                <Websites details={details}/>
                                }
                            </div>
                            <div className='single__details__image__age'>

                                {details.alternativeNames &&
                                <div className='text'>
                                    <span className='title'>Alternative names:</span>
                                    <p>
                                        {details.alternativeNames.map( (name, index) => <span key={index}>{name} | </span>)}
                                    </p>
                                </div>
                                }

                                {(details.ageCategory && details.ageRating) &&
                                <div className='text age_rating'>
                                    <span className='title'>Age Rating:</span>
                                    <div className='age_rating__text'>
                                        <p>
                                            {details.ageCategory.map( (ageCategory, index) => <span key={index}>{ageCategory}</span>)}
                                        </p>
                                        <p>
                                            {details.ageRating.map((ageRating, index) => <span key={index}>{ageRating}  </span>)}
                                        </p>
                                    </div>
                                </div>
                                }

                                {details.company &&
                                <div className='text'>
                                    <span className='title'>Company:</span>
                                    <p>
                                        {details.company.map((company, index) => <span key={index}>{company} | </span>)}
                                    </p>
                                </div>
                                }

                                {details.mode &&
                                <div className='text'>
                                    <span className='title'>Mode:</span>
                                    <p>
                                        {details.mode.map((mode, index) => <span key={index}>{mode} | </span>)}
                                    </p>
                                </div>
                                }

                                {details.genre &&
                                <div className='text'>
                                    <span className='title'>Genre:</span>
                                    <p>
                                        {details.genre.map((genre, index) => <span key={index}>{genre} | </span>)}
                                    </p>
                                </div>
                                }

                                {details.releaseDate &&
                                <div className='text'>
                                    <span className='title'>Release year:</span>
                                    <p>
                                        <span>{ details.releaseDate[0] !== undefined ? details.releaseDate[0] : '-'}</span>
                                    </p>
                                </div>
                                }

                                {details.themes &&
                                <div className='text'>
                                    <span className='title'>Themes:</span>
                                    <p>
                                        {details.themes.map((theme, index) => <span key={index}>{theme} | </span>)}
                                    </p>
                                </div>
                                }
                            </div>
                        </div>
                        <div className='single__details__text'>
                            <span className='title'>Summary:</span>
                            <p> {details.summary !== undefined ? details.summary : '-'}</p>
                        </div>
                    </div>

                </section>

            </CSSTransition>
        </TransitionGroup>

    );
}

export default Single;
