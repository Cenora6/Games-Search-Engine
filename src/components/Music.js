// import React from "react";
// import Sound from 'react-sound';
//
//
//
// const Music = () => {
//
//
//
//     return (
//         <div>
//             <Sound
//                 url={retroWave}
//                 playStatus={Sound.status.PLAYING}
//                 loop={true}
//                 volume={50}
//             />
//         </div>
//     )
// };
//
// export default Music;

import React, { useState, useEffect } from "react";
import retroWave from './../assets/music/retrowave.mp3';

function Music ()  {
    const player = document.getElementById("audioPlayer");

    useEffect(() => {
        player && player.load()
    }, [])

    return (
        <audio id="audioPlayer">
            <source src={retroWave} type="audio/mp3" />
        </audio>
    )

};

export default Music;