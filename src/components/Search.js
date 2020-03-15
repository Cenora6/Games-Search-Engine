import React, { useState, useEffect } from "react";

const Search = ()  => {

    return (
        <form className='games'>
            <label htmlFor='game' className='games__label'>Your Games Database</label>
            <div className="nes-field is-inline games__input">
                <input type="text" id="games" className="nes-input is-dark" placeholder="Search for a game..."/>
            </div>
            <button type="submit" className="nes-btn is-warning games__button">Search</button>
        </form>
    )

};

export default  Search;