import React, { useState, useEffect } from "react";
import axios from 'axios';

const API_KEY = "a1a07d899b79f479d6e932de223b9be9";
const proxy = 'https://cors-anywhere.herokuapp.com/';

const Games = ()  => {

    const [data, setData] = useState();

    // useEffect(() => {
    //     axios({
    //         url: `${proxy}https://api-v3.igdb.com/games/`,
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'user-key': API_KEY
    //         },
    //         data: "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,collection,cover,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,popularity,pulse_count,rating,rating_count,release_dates,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;"
    //     })
    //         .then(response => {
    //             console.log(response.data);
    //             setData(response.data)
    //         })
    //         .catch(err => {
    //             console.error(err);
    //         });
    // });

    return (
        <ul>
            {/*{data.map(item => (*/}
            {/*    <li key={item.objectID}>*/}
            {/*        <a href={item.url}>{item.title}</a>*/}
            {/*    </li>*/}
            {/*))}*/}
        </ul>
    );
};

export default  Games;