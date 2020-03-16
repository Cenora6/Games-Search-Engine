import React from "react";

const Games = ({data, image})  => {

    console.log(data)

    console.log(image[0])
    if(image[0]) {
        console.log("jest")
        console.log(image[0].image_id)
        // const image = `images.igdb.com/igdb/image/upload/t_thumb/${image[0].image_id}.jpg`
    }

    return (
        <div className='games'>
            {data.map( (game) => {
                return (
                    <div key={game.id} className='games__container'>
                        <div style={{margin: "2rem"}} className={` ${data.length > 0 && "games__container__description nes-container is-rounded is-dark  with-title"}`}>
                            <h2 className="title" style={{color: "blue"}}>{game.name}</h2>
                            <p>{game.summary}</p>
                        </div>

                        <div className='games__container__details'>
                            {/*{console.log(image[0])}*/}
                            {/*{image[0].image_url.length > 0} && (*/}
                            {/*<img src={`images.igdb.com/igdb/image/upload/t_thumb/${image[0]}.jpg}`} alt='image'/>*/}
                            {/*)*/}
                        </div>

                    </div>
                )
            })}
        </div>
    );
};

export default  Games;