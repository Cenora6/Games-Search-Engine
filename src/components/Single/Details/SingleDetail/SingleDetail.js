import React from 'react';

const singleDetail = (props) => (
    <div className='text'>
        <span className='title'>{props.title}</span>
        {props.children}
    </div>
)

export default singleDetail;