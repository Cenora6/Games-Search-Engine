import React from "react";
import TextTruncate from 'react-text-truncate';

const Games = ({data, image})  => {
    return (
        <div className='games'>
            {data.map( (game, index) => {
                return (
                    <div className='games__container  nes-container is-rounded is-dark'>
                        <h2>{game.name}</h2>
                        <div className={` ${data.length > 0 && "games__container__details"}`}>
                            <div className='games__container__details__description'>
                                <TextTruncate
                                    line={10}
                                    element="p"
                                    truncateText="…"
                                    text={game.summary}
                                    textTruncateChild={<span>Read more...</span>}
                                />
                            </div>
                            {image[index] &&
                            <div className='games__container__details__photos'>
                                <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${image[index].image_id}.jpg`} alt={index}/>
                            </div>
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default  Games;