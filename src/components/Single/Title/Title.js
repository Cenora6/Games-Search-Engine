import React from 'react';
import exit from "../../../assets/xmark.svg";

const title = (props) => (
    <div className='single__title'>
        <h2>{props.details.name}</h2>
        <img
            className="nes-avatar nes-pointer"
            alt="exit singleDetail"
            src={exit}
            style={{imageRendering: "pixelated"}}
            onClick={props.close}/>
    </div>
)

export default title;