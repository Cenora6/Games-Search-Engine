import React, {useState, useEffect} from 'react';
import Games from "./components/Games/Games";
import Search from "./components/Search/Search";
import {getDetails, getGames} from "./api/Api";
import retroWave from "./assets/music/retrowave.mp3";
import Single from "./components/Single/Single";
import getAppToken from './auth/Auth';

function App() {

    const [game, setGame] = useState("");
    const [focus, setFocus] = useState(false);
    const [data, setData] = useState([]);
    const [image, setImage] = useState([]);
    const [loading, setLoading] = useState(null);
    const [activeSite, setActiveSite] = useState(1);
    const [showDetails, setShowDetails] = useState(false);
    const [details, setDetails] = useState({});
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const handleInputChange = (e) => {
        setGame(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        game.length === 0 ? (setFocus(true) && setLoading(0)) : setLoading(1);
        game.length !== 0 && getGames(game, data, setData, image, setImage, setGame, setLoading, activeSite);
    };

    const handleFocus = () => {
        setFocus(false);
        setLoading(null);
        setActiveSite(1);
        setShowDetails(false);
        setData([]);
        setDetails({});
    };

    const changeWebsite = (e) => {
        e.target.classList.contains('right') ? setActiveSite(activeSite + 1) : setActiveSite(activeSite - 1);
    };

    const handleShowDetails = (e) => {
        getDetails(e.currentTarget.id, setDetails, setShowDetails);
        setLoading(1)
        setTimeout( () => {
            setLoading(2)
        }, 2000);
        setTimeout( () => {
            setShowDetails(true);
            setLoading(null)
        }, 3000)
    };

    const handleCloseDetails = () => {
        setDetails({});
        setShowDetails(false);
        setLoading(0)
    };

    useEffect(() => {
        const handleWindowResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight)};

        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);


    useEffect(() => {
        getAppToken();
    }, []);

    return (
        <>
            <section className={`background ${(loading) && "blur"}`}>
                <div className={`background__loading`} style={{display: `${!loading ? 'none' : "flex"}`}}>
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
                        handleInputChange={handleInputChange} handleFocus={handleFocus} loading={loading}/>
                <Games data={data} image={image} loading={loading} activeSite={activeSite} setActiveSite={setActiveSite}
                       changeWebsite={changeWebsite} handleShowDetails={handleShowDetails} width={width} height={height}/>
                <Single showDetails={showDetails} details={details} handleCloseDetails={handleCloseDetails}/>
            </section>
        </>

    );
}

export default App;
