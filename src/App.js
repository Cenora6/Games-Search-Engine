import React, {useState, useEffect, useRef} from 'react';
import Games from "./components/Games";
import Search from "./components/Search";
import getGames from "./components/Api";
import retroWave from "./assets/music/retrowave.mp3";

function App() {

    const node = useRef();
    const [game, setGame] = useState("");
    const [focus, setFocus] = useState(false);
    const [data, setData] = useState([]);
    const [image, setImage] = useState([]);
    const [loading, setLoading] = useState(null);
    const [activeSite, setActiveSite] = useState(1);

    const handleInputChange = (e) => {
        setGame(e.target.value);
    };

    const handleSubmit = (e) => {
        console.log(game);
        e.preventDefault();
        game.length === 0 ? (setFocus(true) && setLoading(0)) :  setLoading(1);
        getGames(game, data, setData, image, setImage, setGame, setLoading, activeSite);
    };

    const handleFocus = () => {
        setFocus(false);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    const handleClick = e => {
        if (node.current.contains(e.target)) {
            // if(!e.target.classList.contains('games__container')) {
            //     setData([]);
            // }
        }
    };


    const changeWebsite = (e) => {
        e.target.classList.contains('right') ? setActiveSite(activeSite + 1) : setActiveSite(activeSite - 1);
    };

    return (
        <>
            <section className={`background ${loading && "blur"}`} ref={node}>
                <div className={`background__loading`} style={{display: `${loading === null ? 'none' : "flex"}`}}>
                    <div className='background__loading__text'>
                        <p>Loading</p>
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                    </div>
                    <i className={`nes-icon is-large star ${loading === 1 && 'is-transparent'} ${loading === 2 && 'is-half'}`}/>
                </div>
                <audio src={retroWave} autoPlay={true} loop={true}/>
                <Search handleSubmit={handleSubmit} focus={focus} game={game}
                        handleInputChange={handleInputChange} handleFocus={handleFocus}/>
                <Games data={data} image={image} loading={loading} activeSite={activeSite} setActiveSite={setActiveSite}
                       changeWebsite={changeWebsite}/>
            </section>
        </>

    );
}

export default App;
