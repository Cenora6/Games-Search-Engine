import React, {useEffect} from "react";
import Sound from 'react-sound';
import retroWave from './../assets/music/retrowave.mp3';

const Music = () => {

    return (
        <div>
            <Sound
                url={retroWave}
                playStatus={Sound.status.PLAYING}
                loop = {true}
            />
        </div>
    )
};

export default Music;