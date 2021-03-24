import React from 'react'
import { Col } from 'antd';
import './GridCards.css'



function GridCards(props) {
    if(props.LandingPage){
        return (
            <Col lg={6} md={8} xs={24} >
                <div className="grid_cards">
                    <a href={`/movie/${props.movieID}`} >
                        <img src={props.image} alt={props.movieName}/>
                    </a>
                </div>
            </Col>
        )
    }else{
        return (
            <Col lg={6} md={8} xs={24} >
                <div className="grid_cards">
                    <img src={props.image ? props.image : "http://placehold.it/220x320?text=" + props.actorName} alt={props.actorName}/>
                </div>
            </Col>
        )   
    }
    
}

export default GridCards