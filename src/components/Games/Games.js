import React from "react";
import Buttons from './Buttons/Buttons';
import FilterGames from './FilterGames/FilterGames';
import Error from './Error/Error';

const Games = ({data, image, loading, activeSite, changeWebsite, handleShowDetails, width, height})  => {

    let gamesPerPage;

    if(height < 600) {
        gamesPerPage = 2;
    } else if (height < 750) {
        gamesPerPage = 3;
    } else {
        gamesPerPage = 4;
    }

    const mobileStyle = {
        margin: "0 auto",
        marginTop: "0.5rem"
    };

    const desktopStyle = {
        marginTop: "0.5rem"
    };

    const indexLast = activeSite * gamesPerPage;
    const indexFirst = indexLast - gamesPerPage;
    const filterGames = data.slice(indexFirst, indexLast);

    return (
        <div className='games' style={{opacity: `${loading === 0 ? '1' : "0"}`}}>

            {(data.length === 0 && loading === 0) &&
            <Error loading={loading} data={data} width={width} mobile={mobileStyle} desktop={desktopStyle}/>
            }

            <FilterGames site={activeSite} filterGames={filterGames} width={width} data={data} image={image}
                         show={handleShowDetails} mobile={mobileStyle} desktop={desktopStyle}/>

            <div className='games__button'>
                <Buttons activeSite={activeSite} data={data} changeWebsite={changeWebsite} gamesPerPage={gamesPerPage}/>
            </div>
        </div>
    );
};

export default  Games;