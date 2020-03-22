import axios from "axios";
const API_KEY = "0f6d27ac61f75a0d86a657e5b464f1e0";
const proxy = 'https://game-searching-engine.herokuapp.com/';

function getGames(game, data, setData, image, setImage, setGame, setLoading) {
    axios({
        url: `${proxy}https://api-v3.igdb.com/games/`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'user-key': API_KEY
        },
        data: `search "${game}";
               fields id,name,cover;
               limit 50;
               where cover != n;`
    })
        .then(response => {
            if(response.data.length === 0) {
                setLoading(2);
                setTimeout( () => {
                    setLoading(3);
                }, 1000);
                setTimeout( () => {
                    setLoading(0);
                }, 2000);
            }
            setLoading(2);
            setGame("");
            setData(response.data);
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
                       fields image_id;`
                })
                    .then(res => {
                        setLoading(3);
                        imageArray = [...imageArray, res.data[0]];
                        setImage(imageArray);
                        setTimeout( () => {
                            setLoading(0);
                        }, 2000);
                    })
                    .catch(err => {
                        console.error(err);
                    });
            });
        })
        .catch(error => {
            console.log(error.response);
        });
}


function getDetails(game, setDetails, details) {
    console.log(game)
    axios({
        url: `${proxy}https://api-v3.igdb.com/games/`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'user-key': API_KEY
        },
        data: `where id=${game};
               fields *;
               exclude aggregated_rating, aggregated_rating_count, artworks, bundles, created_at, dlcs, expansions,
               external_games, follows, franchise, franchises, hypes, keywords, multiplayer_modes, parent_game,
               player_perspectives, popularity, pulse_count, rating, rating_count, screenshots, similar_games,
               slug, standalone_expansions, status, tags, total_rating, total_rating_count, updated_at, url,
               version_parent, version_title, videos;`
    })
        .then(response => {
            console.log(response.data);
            const data = response.data[0];

            getAgeRating(data.age_ratings, setDetails);

            getAlternativeNames(data.alternative_names, setDetails);

            getCompany(data.involved_companies, setDetails);

            getCover(data.cover, setDetails);

            getGameMode(data.game_modes, setDetails);

            getGenres(data.genres, setDetails);

            getReleaseDate(data.release_dates, setDetails);


            // setDetails((prevState) => ({
            //     ...prevState,
            //     id: data.id,
            //     name: data.name,
            //     summary: data.summary,
            // }));

            // setDetails({
            //
            //     // ageRating: null,
            //     // alternativeNames: null,
            //     // category: null,
            //     // collection: null,
            //     // cover: null,
            //     // releaseDate: null,
            //     // gameEngine: null,
            //     // gameMode: null,
            //     // genres: null,
            //     // companies: null,
            //     // platforms: null,
            //     // themes: null,
            //     // timeToBeat: null,
            //     // websites: null,
            // })


            // console.log(response.data[0].age_ratings)
            // getAgeRating(response.data[0].age_ratings, details);
            // setDetails()
            // console.log(details)

        })
        .catch(error => {
            console.log(error.response);
        });


}


function getAgeRating(rating, setDetails) {

    let ratingData = {
        category: [],
        rating: [],
    };

    rating.forEach( (rating) => {

        axios({
            url: `${proxy}https://api-v3.igdb.com/age_ratings/`,
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'user-key': API_KEY
            },
            data: `where id = ${rating};
               fields category, rating;`
        })
            .then(res => {

                if(res.data[0].category === 1) {
                    ratingData.category.push("ESRB");
                } else {
                    ratingData.category.push("PEGI");
                }

                if(res.data[0].rating === 1) {
                    ratingData.rating = [...ratingData.rating, "rating 3"];
                } else if(res.data[0].rating === 2) {
                    ratingData.rating = [...ratingData.rating, "rating 7"];
                } else if(res.data[0].rating === 3) {
                    ratingData.rating = [...ratingData.rating, "rating 12"];
                } else if(res.data[0].rating === 4) {
                    ratingData.rating = [...ratingData.rating, "rating 16"];
                } else if(res.data[0].rating === 5) {
                    ratingData.rating = [...ratingData.rating, "rating 18"];
                } else if(res.data[0].rating === 6) {
                    ratingData.rating = [...ratingData.rating, "rating RP"];
                } else if(res.data[0].rating === 7) {
                    ratingData.rating = [...ratingData.rating, "rating EC"];
                } else if(res.data[0].rating === 8) {
                    ratingData.rating = [...ratingData.rating, "rating E"];
                } else if(res.data[0].rating === 9) {
                    ratingData.rating = [...ratingData.rating, "rating E10"];
                } else if(res.data[0].rating === 10) {
                    ratingData.rating = [...ratingData.rating, "rating T"];
                } else if(res.data[0].rating === 11) {
                    ratingData.rating = [...ratingData.rating, "rating M"];
                } else {
                    ratingData.rating = [...ratingData.rating, "rating AO"];
                }



            })
            .catch(error => {
                console.log(error.response);
            });
    });

    // setDetails((prevState) => ({
    //     ...prevState,
    //     ageRating: {ratingData},
    // }));
}


function getAlternativeNames(name, setDetails) {

    let alternativeNames = [];

    name.forEach( (name) => {
        axios({
            url: `${proxy}https://api-v3.igdb.com/alternative_names/`,
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'user-key': API_KEY
            },
            data: `where id = ${name};
                       fields name;`
        })
            .then(res => {
                alternativeNames.push(res.data[0].name)
            })
            .catch(error => {
                console.log(error.response);
            });
    });
}

function getCompany(company) {

    let companyArray = [];


    company.forEach( (company) => {
        axios({
            url: `${proxy}https://api-v3.igdb.com/involved_companies/`,
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'user-key': API_KEY
            },
            data: `where id=${company};
                       fields *;`
        })
            .then(res => {
                // console.log(res.data[0].company)

                axios({
                    url: `${proxy}https://api-v3.igdb.com/companies/`,
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'user-key': API_KEY
                    },
                    data: `where id=${res.data[0].company};
                       fields *;`
                })
                    .then(res => {
                        companyArray.push(res.data[0].name)

                    })
                    .catch(error => {
                        console.log(error.response);
                    });

            })
            .catch(error => {
                console.log(error.response);
            });
    });

}

function getCover(cover) {
    axios({
        url: `${proxy}https://api-v3.igdb.com/covers/`,
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'user-key': API_KEY
        },
        data: `where id=${cover};
                       fields image_id;`
    })
        .then(res => {

            // console.log("cover", res.data[0].image_id)

        })
        .catch(error => {
            console.log(error.response);
        });
}


function getGameMode(mode) {

    let modeArray = [];


    mode.forEach( (mode) => {
        axios({
            url: `${proxy}https://api-v3.igdb.com/game_modes/`,
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'user-key': API_KEY
            },
            data: `where id=${mode};
                       fields *;`
        })
            .then(res => {
                modeArray.push(res.data[0].name)

            })
            .catch(error => {
                console.log(error.response);
            });
    });


}

function getGenres(genre) {
    let genreArray = [];

    genre.forEach( (genre) => {
        axios({
            url: `${proxy}https://api-v3.igdb.com/genres/`,
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'user-key': API_KEY
            },
            data: `where id=${genre};
                       fields *;`
        })
            .then(res => {
                genreArray.push(res.data[0].name)

            })
            .catch(error => {
                console.log(error.response);
            });
    });

}

function getReleaseDate(date) {
    const releaseDateArray = [];

    date.forEach( (date) => {
        axios({
            url: `${proxy}https://api-v3.igdb.com/release_dates/`,
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'user-key': API_KEY
            },
            data: `where id=${date};
                       fields *;`
        })
            .then(res => {
                releaseDateArray.push(res.data[0].y);

            })
            .catch(error => {
                console.log(error.response);
            });
    });
    console.log(releaseDateArray[0])
}

export {getGames, getDetails};