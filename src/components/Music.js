import React from "react";
import Sound from 'react-sound';
import retroWave from './../assets/music/retrowave.mp3';

const Music = () => {

    return (
        <div>
            <Sound
                url={retroWave}
                playStatus={Sound.status.PLAYING}
                loop={true}
                volume={50}
            />
        </div>
    )
};

export default Music;