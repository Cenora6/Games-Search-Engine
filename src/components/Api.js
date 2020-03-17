import axios from "axios";
const API_KEY = "0f6d27ac61f75a0d86a657e5b464f1e0";
const proxy = 'https://cors-anywhere.herokuapp.com/';

export default function getGames(game, data, setData, image, setImage, setGame, setLoading) {

    axios({
        url: `${proxy}https://api-v3.igdb.com/games`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'user-key': API_KEY
        },
        data: `search "${game}";
               fields id,name,cover;
               limit 4;
               where cover != n;`
    })
        .then(response => {
            setLoading(2);
            setData(response.data);
            console.log(response.data)
            let imageArray = [];
            response.data.forEach ( (game) => {
            axios({
                url: `${proxy}https://api-v3.igdb.com/covers/`,
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'user-key': API_KEY
                },
                data: `where id=${game.cover};
                       fields *;`
            })
                .then(res => {
                    setLoading(3);
                    imageArray = [...imageArray, res.data[0]]
                    setImage(imageArray)
                    setTimeout( () => {
                        setLoading(0);
                        setGame("");
                    }, 1000);
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