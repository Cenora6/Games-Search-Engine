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
               limit 100;
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
                        imageArray = [...imageArray, res.data[0]];
                        (imageArray.length === response.data.length) && setLoading(3);
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

function getDetails(game, setDetails, setShowDetails) {
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

            setDetails((prevState) => ({
                ...prevState,
                id: data.id,
                name: data.name,
                summary: data.summary,
            }));

            data.age_ratings &&
            getAgeRating(data.age_ratings, setDetails);

            data.alternative_names &&
            getAlternativeNames(data.alternative_names, setDetails);

            data.involved_companies &&
            getCompany(data.involved_companies, setDetails);

            data.cover &&
            getCover(data.cover, setDetails);

            data.game_modes &&
            getGameMode(data.game_modes, setDetails);

            data.genres &&
            getGenres(data.genres, setDetails);

            data.release_dates &&
            getReleaseDate(data.release_dates, setDetails);

            data.themes &&
            getTheme(data.themes, setDetails);

            data.websites &&
            getWebsite(data.websites, setDetails);

        })
        .catch(error => {
            console.log(error.response);
        });
}

function getAgeRating(rating, setDetails) {

    let ratingData = [];
    let ratingCategory = [];

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
                    ratingCategory.push("ESRB");
                } else {
                    ratingCategory.push("PEGI");
                }

                if(res.data[0].rating === 1) {
                    ratingData.push("rating 3");
                } else if(res.data[0].rating === 2) {
                    ratingData.push("rating 7");
                } else if(res.data[0].rating === 3) {
                    ratingData.push("rating 12");
                } else if(res.data[0].rating === 4) {
                    ratingData.push("rating 16");
                } else if(res.data[0].rating === 5) {
                    ratingData.push("rating 18");
                } else if(res.data[0].rating === 6) {
                    ratingData.push("rating RP");
                } else if(res.data[0].rating === 7) {
                    ratingData.push("rating EC");
                } else if(res.data[0].rating === 8) {
                    ratingData.push("rating E");
                } else if(res.data[0].rating === 9) {
                    ratingData.push("rating E10");
                } else if(res.data[0].rating === 10) {
                    ratingData.push("rating T");
                } else if(res.data[0].rating === 11) {
                    ratingData.push("rating M");
                } else {
                    ratingData.push("rating A0");
                }

            })
            .catch(error => {
                console.log(error.response);
            });
    });

    setDetails((prevState) => ({
        ...prevState,
        ageRating: ratingData,
        ageCategory: ratingCategory,
    }));
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

    setDetails((prevState) => ({
        ...prevState,
        alternativeNames: alternativeNames,
    }));
}

function getCompany(company, setDetails) {

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

    setDetails((prevState) => ({
        ...prevState,
        company: companyArray,
    }));

}

function getCover(cover, setDetails) {
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

            setDetails((prevState) => ({
                ...prevState,
                cover: res.data[0].image_id,
            }));

        })
        .catch(error => {
            console.log(error.response);
        });

}


function getGameMode(mode, setDetails) {

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

    setDetails((prevState) => ({
        ...prevState,
        mode: modeArray,
    }));
}

function getGenres(genre, setDetails) {
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

    setDetails((prevState) => ({
        ...prevState,
        genre: genreArray,
    }));

}

function getReleaseDate(date, setDetails) {
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

    setDetails((prevState) => ({
        ...prevState,
        releaseDate: releaseDateArray,
    }));
}

function getTheme(themes, setDetails) {
    const themesArray = [];

    themes.forEach( (theme) => {
        axios({
            url: `${proxy}https://api-v3.igdb.com/themes/`,
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'user-key': API_KEY
            },
            data: `where id=${theme};
                       fields name;`
        })
            .then(res => {
                themesArray.push(res.data[0].name);

            })
            .catch(error => {
                console.log(error.response);
            });
    });

    setDetails((prevState) => ({
        ...prevState,
        themes: themesArray,
    }));

}

function getWebsite(website, setDetails) {
    const websiteCategory = [];
    const websiteUrl = [];

    website.forEach( (website) => {
        axios({
            url: `${proxy}https://api-v3.igdb.com/websites/`,
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'user-key': API_KEY
            },
            data: `where id=${website};
                       fields category, url;`
        })
            .then(res => {

                websiteUrl.push(res.data[0].url);

                if(res.data[0].category === 1) {
                    websiteCategory.push("official")
                } else if (res.data[0].category === 2) {
                    websiteCategory.push("wikia")
                } else if (res.data[0].category === 3) {
                    websiteCategory.push("wikipedia")
                } else if (res.data[0].category === 4) {
                    websiteCategory.push("facebook")
                } else if (res.data[0].category === 5) {
                    websiteCategory.push("twitter")
                } else if (res.data[0].category === 6) {
                    websiteCategory.push("twitch")
                } else if (res.data[0].category === 8) {
                    websiteCategory.push("instagram")
                } else if (res.data[0].category === 9) {
                    websiteCategory.push("youtube")
                } else if (res.data[0].category === 10) {
                    websiteCategory.push("iphone")
                } else if (res.data[0].category === 11) {
                    websiteCategory.push("ipad")
                } else if (res.data[0].category === 12) {
                    websiteCategory.push("android")
                } else if (res.data[0].category === 13) {
                    websiteCategory.push("steam")
                } else if (res.data[0].category === 14) {
                    websiteCategory.push("reddit")
                } else if (res.data[0].category === 15) {
                    websiteCategory.push("itch")
                } else if (res.data[0].category === 16) {
                    websiteCategory.push("epicgames")
                } else if (res.data[0].category === 17) {
                    websiteCategory.push("gog")
                }

            })
            .catch(error => {
                console.log(error.response);
            });
    });

    setDetails((prevState) => ({
        ...prevState,
        websitesCategory: websiteCategory,
        websitesUrl: websiteUrl,
    }));

}

export {getGames, getDetails};