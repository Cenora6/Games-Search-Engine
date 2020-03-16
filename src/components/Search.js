import React from "react";

const Search = ({handleSubmit, submit, game, handleInputChange, handleFocus})  => {

    return (
        <form className='search' onSubmit={handleSubmit}>
            <label htmlFor='game' className='search__label'>Your Games Database</label>
            <div className="nes-field is-inline search__input">
                <input type="text" id="games" className={`nes-input ${submit === false ? "is-dark" : "is-error"} `}
                       placeholder={`${submit === false ? "Search for a game..." : "Game's name can't be empty..."}`}
                       value={game} onChange={handleInputChange}
                       onClick={handleFocus}/>
            </div>
            <button type="submit" className="nes-btn is-warning search__button" onSubmit={handleSubmit}>Search</button>
        </form>
    )

};

export default  Search;