import React, { useState, useEffect } from "react";

const Search = ()  => {
    const [game, setGame] = useState("");
    const [clicked, setClicked] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        game.length === 0 && setClicked(!clicked);
        console.log(clicked)
        console.log(game)
    };

    return (
        <form className='games' onSubmit={handleSubmit}>
            <label htmlFor='game' className='games__label'>Your Games Database</label>
            <div className="nes-field is-inline games__input">
                <input type="text" id="games" className={`nes-input ${clicked === false ? "is-dark" : "is-error"} `}
                       placeholder={`${clicked === false ? "Search for a game..." : "Game's name can't be empty..."}`}
                value={game} onChange={ (e) => setGame(e.target.value)}/>
            </div>
            <button type="submit" className="nes-btn is-warning games__button">Search</button>
        </form>
    )

};

export default  Search;