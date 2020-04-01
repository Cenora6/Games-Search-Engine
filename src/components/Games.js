import React from "react";
import {
    CSSTransition,
    TransitionGroup
} from 'react-transition-group';

const Buttons = ({activeSite, data, changeWebsite, gamesPerPage}) => {

    const allPages = Math.ceil(data.length/gamesPerPage);

    if(data.length < 0 || data.length <= gamesPerPage) {
        return null;
    } else if (activeSite === 1) {
        return (
            <button type="button" className="nes-btn is-warning right" onClick={changeWebsite}>&gt;</button>
        )
    } else if (activeSite === allPages) {
        return (
            <button type="button" className="nes-btn is-warning left" onClick={changeWebsite}>&lt;</button>
        )
    } else {
        return (
            <>
                <button type="button" className="nes-btn is-warning left" onClick={changeWebsite}>&lt;</button>
                <button type="button" className="nes-btn is-warning right" onClick={changeWebsite}>&gt;</button>)
            </>
        )
    }
};

const Games = ({data, image, loading, activeSite, changeWebsite, handleShowDetails, width, height})  => {

    let gamesPerPage;

    if(height < 600) {
        gamesPerPage = 2;
    } else if (height < 750) {
        gamesPerPage = 3;
    } else {
        gamesPerPage = 4;
    }

    const indexLast = activeSite * gamesPerPage;
    const indexFirst = indexLast - gamesPerPage;
    const filterGames = data.slice(indexFirst, indexLast);
    const mobileStyle = {
        margin: "0 auto",
        marginTop: "0.5rem"
    };

    const desktopStyle = {
        marginTop: "0.5rem"
    };

    return (
        <div className='games' style={{opacity: `${loading === 0 ? '1' : "0"}`}}>
            {(data.length === 0 && loading === 0) &&
            <TransitionGroup className='games__animation'>
                <CSSTransition
                    timeout={700}
                    classNames="fade"
                    unmountOnExit
                >
                    <div className='games__error nes-container is-rounded is-dark nes-pointer' style={`${width < 768}` ? mobileStyle : desktopStyle}>
                        <h2>No results.</h2>
                    </div>
                </CSSTransition>
            </TransitionGroup>
            }
            {filterGames.map( (game, index) => {
                const imageNumber = index + 4 * (activeSite - 1);
                return (
                    <TransitionGroup className='games__animation' key={index}>
                        <CSSTransition
                            key={game.id}
                            timeout={700}
                            classNames="fade"
                            unmountOnExit
                        >
                            <div id={game.id} className='games__container nes-container is-rounded is-dark nes-pointer' onClick={handleShowDetails}
                                 style={`${width < 768}` ? mobileStyle : desktopStyle}>
                                <h2>{game.name}</h2>
                                <div className={` ${data.length > 0 && "games__container__details"}`}>
                                    {image[index] !== undefined &&
                                    <div className='games__container__details__photos'>
                                        <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${image[imageNumber].image_id}.jpg`} alt={index}/>
                                    </div>
                                    }
                                </div>
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                )
            })}

            <div className='games__button'>
                <Buttons activeSite={activeSite} data={data} changeWebsite={changeWebsite} gamesPerPage={gamesPerPage}/>
            </div>
        </div>
    );
};

export default  Games;