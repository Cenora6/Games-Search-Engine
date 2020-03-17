import axios from "axios";
import {useEffect} from "react";
const API_KEY = "0f6d27ac61f75a0d86a657e5b464f1e0";
const proxy = 'https://cors-anywhere.herokuapp.com/';

export default function getGames(game, data, setData, image, setImage) {

    axios.get("https://api-v3.igdb.com/games", {
        headers: {
            'Accept': 'application/json',
            'user-key': API_KEY
        },
        // exclude aggregated_rating, aggregated_rating_count, bundles, created_at, external_games, follows, franchise,
        // game_engines, game_modes, hypes, multiplayer_modes, player_perspectives, popularity, pulse_count, rating_count,
        // standalone_expansions, total_rating, total_rating_count, updated_at, videos;
        data: `search "${game}";
               fields name, cover;
               
               limit 20;
               where cover != n;`
    })
        .then(response => {
            setData(response.data);
            console.log(response.data)

            // let imageArray = [];
            // response.data.forEach ( (game) => {
            // axios({
            //     url: `${proxy}https://api-v3.igdb.com/covers/`,
            //     method: 'POST',
            //     headers: {
            //         Accept: 'application/json',
            //         'user-key': API_KEY
            //     },
            //     data: `where id=${game.cover};
            //            fields *;`
            // })
            //     .then(res => {
            //         imageArray = [...imageArray, res.data[0]]
            //         setImage(imageArray)
            //     })
            //     .catch(err => {
            //         console.error(err);
            //     });
            // });
        })
        .catch(error => {
            console.log(error.response)
        });
};