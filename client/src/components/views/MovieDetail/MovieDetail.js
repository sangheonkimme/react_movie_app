import React,{ useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../commons/MainImage';
import GridCards from '../commons/GridCards';
import MovieInfo from './Sections/MovieInfo';
import Favorite from './Sections/Favorite';
import { Row } from 'antd';

function MovieDetail(props) {

    let movieID = props.match.params.movieID
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    useEffect(() => {
        
        let endpointCrew = `${API_URL}movie/${movieID}/credits?api_key=${API_KEY}`

        let endpointInfo = `${API_URL}movie/${movieID}?api_key=${API_KEY}`

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => (

                setMovie(response)

            ))

        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => (
                console.log(response.cast),
                setCasts(response.cast)

            ))
    }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }

    return (
        <div>

            {/* Header */}
            <MainImage 
                image={`${IMAGE_BASE_URL}w1280${Movie.poster_path}`}
                title={Movie.original_title}
                text={Movie.overview}
            />
            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                    <Favorite movieInfo={Movie} movieID={movieID} userFrom= {localStorage.getItem('userId')} />
                </div>

                {/* Movie Info */}
                <MovieInfo movie={Movie}/>

                <br />
                {/* Actors Grid */}

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button onClick={toggleActorView}> Toggle Actor View </button>
                </div>

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
                



            </div>

        </div>
    )
}

export default MovieDetail