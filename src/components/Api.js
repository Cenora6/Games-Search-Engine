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

            data.age_ratings.forEach( (rating) => {
                getAgeRating(rating, setDetails);
            });

            data.alternative_names.forEach( (name) => {
                getAlternativeNames(name, setDetails);
            });

            data.involved_companies.forEach( (company) => {
                getCompany(company, setDetails);
            });

            getCover(data.cover, setDetails);

            data.game_modes.forEach( (mode) => {
                getGameMode(mode, setDetails);
            })

            data.genres.forEach( (genre) => {
                getGenres(genre, setDetails);
            })

            data.release_dates.forEach( (date) => {
                getReleaseDate(date, setDetails);
            })


            setDetails({
                id: data.id,
                // ageRating: null,
                // alternativeNames: null,
                // category: null,
                // collection: null,
                // cover: null,
                // releaseDate: null,
                // gameEngine: null,
                // gameMode: null,
                // genres: null,
                // companies: null,
                name: data.name,
                // platforms: null,
                summary: data.summary,
                // themes: null,
                // timeToBeat: null,
                // websites: null,
            })


            console.log(details)

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
        ageRating: [],
    };

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
            //AGE RATING
            // console.log("agerating", res.data)

            if(res.data[0].category === 1) {
                ratingData.category = [...ratingData.category, "ESRB"];
            } else {
                ratingData.category = [...ratingData.category, "PEGI"];
            }

            if(res.data[0].rating === 1) {
                ratingData.ageRating = [...ratingData.ageRating, "rating 3"];
            } else if(res.data[0].rating === 2) {
                ratingData.ageRating = [...ratingData.ageRating, "rating 7"];
            } else if(res.data[0].rating === 3) {
                ratingData.ageRating = [...ratingData.ageRating, "rating 12"];
            } else if(res.data[0].rating === 4) {
                ratingData.ageRating = [...ratingData.ageRating, "rating 16"];
            } else if(res.data[0].rating === 5) {
                ratingData.ageRating = [...ratingData.ageRating, "rating 18"];
            } else if(res.data[0].rating === 6) {
                ratingData.ageRating = [...ratingData.ageRating, "rating RP"];
            } else if(res.data[0].rating === 7) {
                ratingData.ageRating = [...ratingData.ageRating, "rating EC"];
            } else if(res.data[0].rating === 8) {
                ratingData.ageRating = [...ratingData.ageRating, "rating E"];
            } else if(res.data[0].rating === 9) {
                ratingData.ageRating = [...ratingData.ageRating, "rating E10"];
            } else if(res.data[0].rating === 10) {
                ratingData.ageRating = [...ratingData.ageRating, "rating T"];
            } else if(res.data[0].rating === 11) {
                ratingData.ageRating = [...ratingData.ageRating, "rating M"];
            } else {
                ratingData.ageRating = [...ratingData.ageRating, "rating AO"];
            }

            // let ratingArray = [];
            // ratingArray = [...ratingArray, res.data[0]];
            // console.log(ratingArray)
            //
            // setDetails((prevState) => ({
            //     ...prevState,
            //     ageRating: [ratingArray],
            // }));

        })
        .catch(error => {
            console.log(error.response);
        });

    console.log(ratingData)
}

function getAlternativeNames(name, setDetails) {
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
            //ALTERNATIVE NAMES
            // console.log(res.data[0].name);
            // setDetails({"alternativeName": res.data[0].name})
        })
        .catch(error => {
            console.log(error.response);
        });
}

function getCompany(company) {
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
            console.log(res.data[0].company)

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
                    //NAME OF THE COMPANIES
                    // console.log(res.data[0].name)

                })
                .catch(error => {
                    console.log(error.response);
                });

        })
        .catch(error => {
            console.log(error.response);
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

            // GAME'S COVER
            // console.log("cover", res.data[0].image_id)

        })
        .catch(error => {
            console.log(error.response);
        });
}


function getGameMode(mode) {
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
            // GAME MODE NAME
            // console.log(res.data[0].name)

        })
        .catch(error => {
            console.log(error.response);
        });
}

function getGenres(genre) {
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
            // GAME'S GENRES
            // console.log(res.data[0].name)

        })
        .catch(error => {
            console.log(error.response);
        });
}

function getReleaseDate(date) {
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
            // GAME'S RELEASE YEAR
            // console.log(res.data[0].y);

        })
        .catch(error => {
            console.log(error.response);
        });
}

export {getGames, getDetails};