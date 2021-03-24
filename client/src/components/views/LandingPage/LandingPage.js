import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../commons/MainImage';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';
import './LandingPage.css';

function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState([])
    const [currentPage, setcurrentPage] = useState(0)

    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`

    useEffect(() => {
        
        fetchMovies(endpoint)
        
    }, [])

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovies([...Movies, ...response.results])
                setMainMovieImage(response.results[0])
                setcurrentPage(response.page)
            })
    }

    const loadMoreMovies = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`;
        fetchMovies(endpoint)
    }


    return (
        <div className="landing_wrap">
            
            {/* Main Image */}

            {MainMovieImage &&
                <MainImage image={`${IMAGE_BASE_URL}w1280${MainMovieImage.poster_path}`}
                        title={MainMovieImage.original_title}
                        text={MainMovieImage.overview}
                />
            }
            
            <section className="landing_movie_list">

                <h2>Movies by latest</h2>
                <hr />
                
                {/* Movie Grid Cards */}

                <Row gutter={[16,16]}>
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCards 
                                LandingPage
                                image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null }
                                movieID={movie.id}
                                movieName={movie.original_title}
                            />
                        </React.Fragment>
                    ))}
                    
                </Row>

            </section>

            <div className="load_more">
                <button onClick={loadMoreMovies}>Load More</button>
            </div>

        </div>
    )
}

export default LandingPage
