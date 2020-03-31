import React from "react";

const Search = ({handleSubmit, focus, game, handleInputChange, handleFocus})  => {

    return (
        <form className='search' onSubmit={handleSubmit} autoComplete="off">
            <label htmlFor='game' className='search__label'>Your Games Database</label>
            <div className="nes-field is-inline search__input">
                <input type="text" id="games" className={`nes-input ${focus === false ? "is-dark" : "is-error"} `}
                       placeholder={`${focus === false ? "Search for a game..." : "Game's name can't be empty..."}`}
                       value={game} onChange={handleInputChange}
                       onClick={handleFocus}/>
            </div>
            <button type="submit" className="nes-btn is-warning search__button" onSubmit={handleSubmit}>Search</button>
        </form>
    )
};

export default  Search;