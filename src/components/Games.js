import React, { useState, useEffect } from "react";
import axios from 'axios';

const Games = ()  => {

    // const [data, setData] = useState();
    //
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const fetchData = async () => {
    //             const result = await axios(
    //                 'https://hn.algolia.com/api/v1/search?query=redux',
    //             );
    //             setData(result.data);
    //         };
    //         let result = await axios({
    //             url: "https://api-v3.igdb.com/games",
    //             Accept: "application/json",
    //             headers: {
    //                 'user-key': 'a1a07d899b79f479d6e932de223b9be9'
    //             },
    //         });
    //
    //         let games = result.data;
    //         setData(games);
    //     };
    //     fetchData();
    // }, []);
    //
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