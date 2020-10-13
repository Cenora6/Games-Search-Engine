import React from "react";

const buttons = ({activeSite, data, changeWebsite, gamesPerPage}) => {

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

export default buttons;