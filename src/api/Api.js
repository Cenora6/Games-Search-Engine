import axios from "../axios/axios";

function getGames(game, data, setData, image, setImage, setGame, setLoading) {
    axios({
        url: '/games/',
        data: `search "${game}";
               fields id,name,cover;
               limit 20;
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

            console.log("getGames", response.data)

            let imageArray = [];
            response.data.forEach ( (game) => {

                axios({
                    url: '/covers/',
                    data: `where id=${game.cover};
                       fields image_id;`
                })
                    .then(res => {

                        console.log("getImages", res.data)

                        imageArray = [...imageArray, res.data[0]];
                        (imageArray.length === response.data.length) && setLoading(3);
                        setImage(imageArray);

                        setTimeout( () => {
                            setLoading(0);
                        }, 2000);
                    })
                    .catch(err => {
                        return err;
                    });
            });

        })
        .catch(error => {
            return error;
        });
}

function getDetails(game, setDetails) {
    axios({
        url: '/games/',
        data: `where id=${game};
               fields *;
               exclude aggregated_rating, aggregated_rating_count, bundles, created_at, dlcs, expansions,
               external_games, follows, franchise, franchises, keywords,
               player_perspectives, rating, rating_count, screenshots, similar_games,
               slug, tags, total_rating, total_rating_count, updated_at, url;`
    })
        .then(response => {
            console.log("getDetails", response.data)
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
            return error;
        });
}

function getAgeRating(rating, setDetails) {

    let ratingData = [];
    let ratingCategory = [];

    rating.forEach( (rating) => {

        axios({
            url: '/age_ratings/',
            data: `where id = ${rating};
               fields category, rating;`
        })
            .then(res => {
                console.log("getAgeRating", res.data)

                const category = ["ESRB", "PEGI"];
                const categoryIndex = res.data[0].category;
                ratingData.push(category[categoryIndex - 1]);

                const ratings =
                    ["rating 3", "rating 7", "rating 12", "rating 16", "rating 18", "rating RP",
                    "rating EC", "rating E", "rating E10", "rating T", "rating M", "rating A0"]

                const ratingIndex = res.data[0].rating;
                ratingData.push(ratings[ratingIndex - 1]);

            })
            .catch(error => {
                return error;
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
            url: '/alternative_names/',
            data: `where id = ${name};
                       fields name;`
        })
            .then(res => {
                console.log("getAlternativeNames", res.data)
                alternativeNames.push(res.data[0].name)
            })
            .catch(error => {
                return error;
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
            url: '/involved_companies/',
            method: 'POST',
            data: `where id=${company};
                       fields *;`
        })
            .then(res => {

                console.log("getCompany", res.data)
                axios({
                    url: '/companies/',
                    data: `where id=${res.data[0].company};
                       fields *;`
                })
                    .then(res => {
                        console.log("getCompany - details", res.data)
                        companyArray.push(res.data[0].name)

                    })
                    .catch(error => {
                        return error;
                    });

            })
            .catch(error => {
                return error;
            });
    });

    setDetails((prevState) => ({
        ...prevState,
        company: companyArray,
    }));

}

function getCover(cover, setDetails) {
    axios({
        url: '/covers/',
        data: `where id=${cover};
                       fields image_id;`
    })
        .then(res => {
            console.log("getCover", res.data)

            setDetails((prevState) => ({
                ...prevState,
                cover: res.data[0].image_id,
            }));

        })
        .catch(error => {
            return error;
        });

}


function getGameMode(mode, setDetails) {

    let modeArray = [];

    mode.forEach( (mode) => {
        axios({
            url: '/game_modes/',
            data: `where id=${mode};
                       fields *;`
        })
            .then(res => {
                console.log("getGameMode", res.data)
                modeArray.push(res.data[0].name)

            })
            .catch(error => {
                return error;
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
            url: '/genres/',
            data: `where id=${genre};
                       fields *;`
        })
            .then(res => {
                console.log("getGenres", res.data)
                genreArray.push(res.data[0].name)

            })
            .catch(error => {
                return error;
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
            url: '/release_dates/',
            data: `where id=${date};
                       fields *;`
        })
            .then(res => {
                console.log("getReleaseDate", res.data)
                releaseDateArray.push(res.data[0].y);

            })
            .catch(error => {
                return error;
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
            url: '/themes/',
            method: 'POST',
            data: `where id=${theme};
                       fields name;`
        })
            .then(res => {
                console.log("getTheme", res.data)
                themesArray.push(res.data[0].name);

            })
            .catch(error => {
                return error;
            });
    });

    setDetails((prevState) => ({
        ...prevState,
        themes: themesArray,
    }));

}

function getWebsite(website, setDetails) {
    const websiteUrl = [];

    website.forEach( (website) => {
        axios({
            url: '/websites/',
            data: `where id=${website};
                       fields url;`
        })
            .then(res => {
                console.log("getWebsite", res.data)
                websiteUrl.push(res.data[0].url);
            })
            .catch(error => {
                return error;
            });
    });

    setDetails((prevState) => ({
        ...prevState,
        websitesUrl: websiteUrl,
    }));

}

export {getGames, getDetails};