import React,{ useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../commons/MainImage';
import GridCards from '../commons/GridCards';
import MovieInfo from './Sections/MovieInfo';
import Favorite from './Sections/Favorite';
import { Row } from 'antd';
import './MovieDetail.css';

function MovieDetail(props) {

    let movieID = props.match.params.movieID
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    let endpointCrew = `${API_URL}movie/${movieID}/credits?api_key=${API_KEY}`
    let endpointInfo = `${API_URL}movie/${movieID}?api_key=${API_KEY}`

    useEffect(() => {
        
        fetchMovieInfo()
        fetchMovieActors()
            
    }, [])

    const fetchMovieInfo = () => {
        fetch(endpointInfo)
        .then(response => response.json())
        .then(response => (
            setMovie(response)
        ))
    }
    
    const fetchMovieActors = () => {
        fetch(endpointCrew)
        .then(response => response.json())
        .then(response => (
            setCasts(response.  cast)
        ))
    }

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }

    return (
        <>
            {/* Header */}
            <MainImage 
                image={`${IMAGE_BASE_URL}w1280${Movie.poster_path}`}
                title={Movie.original_title}
                text={Movie.overview}
            />
            {/* Body */}
            <section className="movie_detail_page">
                
                <p className="btn_favorite">
                    <Favorite movieInfo={Movie} movieID={movieID} userFrom= {localStorage.getItem('userId')} />
                </p>

                {/* Movie Info */}
                <MovieInfo movie={Movie}/>

                <br />
                {/* Actors Grid */}

                <p className="btn_actor_view">
                    <button onClick={toggleActorView}> Toggle Actor View </button>
                </p>

                { ActorToggle && 
                    <Row gutter={[16,16]}>
                        {Casts && Casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                <GridCards 
                                    image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null }
                                    actorName={cast.name}
                                />
                            </React.Fragment>
                        ))}
                        
                    </Row>
                }
                
            </section>

        </>
    )
}

export default MovieDetail
