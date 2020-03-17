import React, {useState, useEffect, useRef} from 'react';
import Games from "./components/Games";
import Search from "./components/Search";
import Music from "./components/Music";
import getGames from "./components/Api";

function App() {

    const node = useRef();
    const [game, setGame] = useState("");
    const [focus, setFocus] = useState(false);
    const [data, setData] = useState([]);
    const [image, setImage] = useState([]);
    const [loading, setLoading] = useState(0);

    const handleInputChange = (e) => {
        setGame(e.target.value);
    };

    const handleSubmit = (e) => {
        console.log(game);
        e.preventDefault();
        game.length === 0 ? (setFocus(true) && setLoading(0)) :  setLoading(1);
        getGames(game, data, setData, image, setImage, setGame, setLoading);
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
            if(!e.target.classList.contains('games__container')) {
                setData([]);
            }
        }
    };

    return (

        <>
            <section className="background" ref={node}>
                    <i className={`background__loading nes-icon is-large star ${loading === 1 && 'is-transparent'} ${loading === 2 && 'is-half'}`}
                       style={{display: `${loading === 0 ? 'none' : "block"}`}}/>
                <Music/>
                <Search handleSubmit={handleSubmit} focus={focus} game={game}
                        handleInputChange={handleInputChange} handleFocus={handleFocus}/>
                <Games data={data} image={image} loading={loading}/>
            </section>
        </>

    );
}

export default App;
