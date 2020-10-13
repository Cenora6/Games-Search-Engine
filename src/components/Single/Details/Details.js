import React from 'react';
import Websites from "./Websites/Websites";
import SingleDetails from "./SingleDetail/SingleDetail";

const details = (props) => (

    <div className='single__details'>
        <div className='single__details__image'>
            <div className='single__details__image__single'>
                {props.details.cover &&
                <img
                    src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${props.details.cover}.jpg`}
                    alt='game_cover'/>
                }
                {props.details.websitesUrl && <Websites details={props.details}/>}
            </div>
            <div className='single__details__image__age'>

                {props.details.alternativeNames &&

                <SingleDetails title='Alternative names:'>
                    <p>{props.details.alternativeNames.map( (name, index) => <span key={index}>{name} | </span>)}</p>
                </SingleDetails>
                }

                {(props.details.ageCategory && props.details.ageRating) &&
                <div className='age_rating'>
                    <SingleDetails title='Age Rating:'>
                        <p>{props.details.ageCategory.map( (ageCategory, index) => <span key={index}>{ageCategory}</span>)}</p>
                        <p>{props.details.ageRating.map((ageRating, index) => <span key={index}>{ageRating}  </span>)}</p>
                    </SingleDetails>
                </div>
                }

                {props.details.company &&
                <SingleDetails title='Company:'>
                    <p>{props.details.company.map((company, index) => <span key={index}>{company} | </span>)}</p>
                </SingleDetails>
                }

                {props.details.mode &&
                <SingleDetails title='Mode:'>
                    <p>{props.details.mode.map((mode, index) => <span key={index}>{mode} | </span>)}</p>
                </SingleDetails>
                }

                {props.details.genre &&
                <SingleDetails title='Genre:'>
                    <p>{props.details.genre.map((genre, index) => <span key={index}>{genre} | </span>)}</p>
                </SingleDetails>
                }

                {props.details.releaseDate &&
                <SingleDetails title='Release year:'>
                    <p><span>{ props.details.releaseDate[0] !== undefined ? props.details.releaseDate[0] : '-'}</span></p>
                </SingleDetails>
                }

                {props.details.themes &&

                <SingleDetails title='Themes:'>
                    <p>{props.details.themes.map((theme, index) => <span key={index}>{theme} | </span>)}</p>
                </SingleDetails>
                }
            </div>
        </div>
        <div className='single__details__text'>
            <span className='title'>Summary:</span>
            <p> {props.details.summary !== undefined ? props.details.summary : '-'}</p>
        </div>
    </div>

)

export default details;