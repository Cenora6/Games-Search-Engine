import React from 'react';

const singleWebsite = (props) => (
    <a href={props.url} target="_blank" rel="noopener noreferrer" key={props.id}>
        <i className={props.icon} title={props.title}></i>
    </a>
)

export default singleWebsite;