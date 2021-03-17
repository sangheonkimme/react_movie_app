import React, { useEffect } from 'react'
import Axios from 'axios'

function Favorite(props) {

    console.log(props)

    const movieId = props.movieID;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;

    useEffect(() => {
        
        let variable = {
            userFrom: userFrom,
            movieId: movieId
        }

        Axios.post('/api/favorite/favoriteNumber', variable)
            .then(response => {
                if(response.data.success){
                    console.log(response.data)
                }else{
                    alert('숫자 정보를 가져오는데 실패했습니다.')
                }
            })

    }, [])


    return (
        <div>
            <button>Favorite</button>
        </div>
    )
}

export default Favorite
