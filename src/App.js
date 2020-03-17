import React, {useState} from 'react';
import Games from "./components/Games";
import Search from "./components/Search";
import Music from "./components/Music";
import getGames from "./components/Api";

function App() {

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

    return (

        <>
            <section className="background">
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
