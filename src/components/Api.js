import axios from "axios";
const API_KEY = "a1a07d899b79f479d6e932de223b9be9";
const proxy = 'https://cors-anywhere.herokuapp.com/';

export default function getGames(game, data, setData, image, setImage) {
    axios({
        url: `${proxy}https://api-v3.igdb.com/games/`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'user-key': API_KEY
        },
        data: `search "${game}";
               fields *;
               exclude aggregated_rating, aggregated_rating_count, bundles, created_at, external_games, follows, franchise,
               game_engines, game_modes, hypes, multiplayer_modes, player_perspectives, popularity, pulse_count, rating_count,
               standalone_expansions, total_rating, total_rating_count, updated_at, videos;
               limit 3;`
    })
        .then(response => {
            console.log(response.data);
            setData(response.data);

            response.data.forEach ( (game) => {
                // console.log(game)

                axios({
                    url: `${proxy}https://api-v3.igdb.com/covers/`,
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'user-key': API_KEY
                    },
                    data: `where id = ${game.cover}; fields *;`
                })
                    .then(res => {
                        // console.log(res.data);
                        setImage(res.data);
                    })
                    .catch(err => {
                        console.error(err);
                    });
            });
        })
        .catch(error => {
            console.log(error.response)
        });
};

export function getCover(game) {
    axios({
        url: `${proxy}https://api-v3.igdb.com/covers/`,
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'user-key': API_KEY
        },
        data: `where id = ${game.cover}; fields *;`
    })
        .then(res => {
            // console.log(res.data);
        })
        .catch(err => {
            console.error(err);
        });
}