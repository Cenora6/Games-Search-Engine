import React from "react";
import TextTruncate from 'react-text-truncate';

const Buttons = ({activeSite, data, changeWebsite}) => {
    console.log(activeSite)

    const allPages = Math.ceil(data.length/4);
    console.log(allPages)

    if(data.length > 0) {
        if(activeSite === 1) {
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
    } else {
        return null;
    }
};

const Games = ({data, image, loading, activeSite, changeWebsite})  => {

    const indexLast = activeSite * 4;
    const indexFirst = indexLast - 4;
    const filterGames = data.slice(indexFirst, indexLast);

    return (
        <div className='games' style={{opacity: `${loading === null ? '1' : "0"}`}}>
            {filterGames.map( (game, index) => {
                return (
                    <div className='games__container nes-container is-rounded is-dark nes-pointer'>
                        <h2>{game.name}</h2>
                        <div className={` ${data.length > 0 && "games__container__details"}`}>
                            {/*<div className='games__container__details__description'>*/}
                            {/*    <TextTruncate*/}
                            {/*        line={10}*/}
                            {/*        element="p"*/}
                            {/*        truncateText="…"*/}
                            {/*        text={game.summary}*/}
                            {/*        textTruncateChild={<span>Read more...</span>}*/}
                            {/*    />*/}
                            {/*</div>*/}
                            {image[index] &&
                            <div className='games__container__details__photos'>
                                <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${image[index].image_id}.jpg`} alt={index}/>
                            </div>
                            }
                        </div>
                    </div>
                )
            })}
            <div className='games__button'>
                <Buttons activeSite={activeSite} data={data} changeWebsite={changeWebsite}/>
            </div>
        </div>
    );
};

export default  Games;