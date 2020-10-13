import React from 'react';
import SingleWebsite from "./SingleWebsite/SingleWebsite";

export default function Websites({details}) {
    const urls = details.websitesUrl;

    return (
        <span className='single__details__image__single__websites'>
                {urls.map( (url, index) => {
                    if(url.indexOf("facebook") !== -1) {
                        return (
                            <SingleWebsite url={url} id={index} icon='fab fa-facebook-f' title='facebok'/>
                        )
                    } else if (url.indexOf("wiki") !== -1 && url.indexOf("wikipedia") === -1) {
                        return (
                            <SingleWebsite url={url} id={index} icon='fas fa-file-alt' title='wikia'/>
                        )
                    } else if (url.indexOf("wikipedia") !== -1) {
                        return (
                            <SingleWebsite url={url} id={index} icon='fab fa-wikipedia-w' title='wikipedia'/>
                        )
                    } else if (url.indexOf("twitter") !== -1) {
                        return (
                            <SingleWebsite url={url} id={index} icon='fab fa-twitter' title='twitter'/>
                        )
                    } else if (url.indexOf("twitch") !== -1) {
                        return (
                            <SingleWebsite url={url} id={index} icon='fab fa-twitch' title='twitch'/>
                        )
                    } else if (url.indexOf("instagram") !== -1) {
                        return (
                            <SingleWebsite url={url} id={index} icon='fab fa-instagram' title='instagram'/>
                        )
                    } else if (url.indexOf("youtube") !== -1) {
                        return (
                            <SingleWebsite url={url} id={index} icon='fab fa-youtube' title='youtube'/>
                        )
                    } else if (url.indexOf("iphone") !== -1) {
                        return (
                            <SingleWebsite url={url} id={index} icon='fas fa-mobile-alt' title='iphone'/>
                        )
                    } else if (url.indexOf("ipad") !== -1) {
                        return (
                            <SingleWebsite url={url} id={index} icon='fas fa-tablet-alt' title='ipad'/>
                        )
                    } else if (url.indexOf("android") !== -1) {
                        return (
                            <SingleWebsite url={url} id={index} icon='fab fa-android' title='android'/>
                        )
                    } else if (url.indexOf("steam") !== -1) {
                        return (
                            <SingleWebsite url={url} id={index} icon='fab fa-steam' title='steam'/>
                        )
                    } else if (url.indexOf("reddit") !== -1) {
                        return (
                            <SingleWebsite url={url} id={index} icon='fab fa-reddit' title='reddit'/>
                        )
                    } else if (url.indexOf("itch") !== -1) {
                        return (
                            <SingleWebsite url={url} id={index} icon='fab fa-itch-io' title='itch'/>
                        )
                    } else if (url.indexOf("epicgames") !== -1) {
                        return (
                            <SingleWebsite url={url} id={index} icon='fas fa-gamepad' title='epic games'/>
                        )
                    } else if (url.indexOf("gog") !== -1) {
                        return (
                            <SingleWebsite url={url} id={index} icon='fas fa-ghost' title='gog'/>
                        )
                    } else {
                        return (
                            <SingleWebsite url={url} id={index} icon='fas fa-check-doublee' title='official'/>
                        )
                    }

                })}

            </span>
    )
}