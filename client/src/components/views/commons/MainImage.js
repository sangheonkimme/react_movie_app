import React from 'react';

function MainImage(props) {
    return (
        <div className="mainImage" style={{ backgroundImage: `url('${props.image}')` }}>
            <div>
                <div style={{ position: 'absolute', maxWidth: '500px', bottom: '2rem', marginLeft: '2rem' }}>
                    <h2 style={{ color: 'white' }}> {props.title} </h2>
                    <p style={{ color: 'white', fontSize: '1rem' }}> {props.text} </p>
                </div>
            </div>
        </div>
    )
}


export default MainImage