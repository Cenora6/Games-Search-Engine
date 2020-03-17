import React, {useState} from 'react';
import Games from "./components/Games";
import Search from "./components/Search";
import Music from "./components/Music";
import getGames from "./components/Api";

function App() {

    const [game, setGame] = useState("");
    const [submit, setSubmit] = useState(false);
    const [data, setData] = useState([]);
    const [image, setImage] = useState([]);
    console.log(game, "game")

    const handleInputChange = (e) => {
        setGame(e.target.value)
        getGames(game, data, setData, image, setImage);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        game.length === 0 && setSubmit(true);
        console.log(submit); //if submit is clicked
        console.log(game); //game written in submit
        getGames(game, data, setData, image, setImage);
        console.log(data)
    };

    const handleFocus = (e) => {
        setSubmit(false);
    };

    return (
        <>
            <section className="background">
                <Music/>
                <Search handleSubmit={handleSubmit} submit={submit} game={game}
                        handleInputChange={handleInputChange} handleFocus={handleFocus}/>
                <Games data={data} image={image}/>
            </section>
        </>

    );
}

export default App;
