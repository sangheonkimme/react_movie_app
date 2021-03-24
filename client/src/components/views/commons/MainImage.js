import React from 'react';
import './MainImage.css';

function MainImage(props) {
    return (
        <div className="main_image" style={{ backgroundImage: `url('${props.image}')` }}>
            <div className="main_image_txt" >
                <h2> {props.title} </h2>
                <p> {props.text} </p>
            </div>
        </div>
    )
}


export default MainImage