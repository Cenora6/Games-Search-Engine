import React from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const filterGames = (props) => (
    <>
        {props.filterGames.map((game, index) => {
            const imageNumber = index + 4 * (props.site - 1);
            return (
                <TransitionGroup className='games__animation' key={index}>
                    <CSSTransition
                        key={game.id}
                        timeout={700}
                        classNames="fade"
                        unmountOnExit
                    >
                        <div id={game.id}
                             className='games__container nes-container is-rounded is-dark nes-pointer'
                             onClick={props.show}
                             style={`${props.width < 768}` ? props.mobile : props.desktop}>
                            <h2>{game.name}</h2>
                            <div className={` ${props.data.length > 0 && "games__container__details"}`}>
                                {props.image[index] !== undefined &&
                                <div className='games__container__details__photos'>
                                    <img
                                        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${props.image[imageNumber].image_id}.jpg`}
                                        alt={index}/>
                                </div>
                                }
                            </div>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            )
        })}
    </>
)

export default filterGames;