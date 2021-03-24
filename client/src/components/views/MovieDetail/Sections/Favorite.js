import React, { useEffect, useState } from 'react'
import Axios from 'axios'

function Favorite(props) {

    const movieId = props.movieID;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    let variables = {
        userFrom: userFrom,
        movieId: movieId,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime
    }


    useEffect(() => {

        fetchFavoriteNumber()
        fetchIsFavorited()
        
    }, [])

    
    const fetchFavoriteNumber = () => {
        Axios.post('/api/favorite/favoriteNumber', variables)
        .then(response => {
            if(response.data.success){
                setFavoriteNumber(response.data.favoriteNumber)
            }else{
                alert('숫자 정보를 가져오는데 실패했습니다.')
            }
        })
    }

    const fetchIsFavorited = () => {
        Axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if(response.data.success){
                    setFavorited(response.data.favorited)
                }else{
                    alert('정보를 가져오는데 실패했습니다.')
                }
            })
    }


    const onClickFavorite = () => {
        if(Favorited){
            Axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if(response.data.success){
                        setFavoriteNumber(FavoriteNumber - 1)
                        setFavorited(!Favorited)
                    }else {
                        alert('Favorite 리스트에서 지우는데 실패했습니다.')
                    }
                })
        }else {
            Axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if(response.data.success){
                        setFavoriteNumber(FavoriteNumber + 1)
                        setFavorited(!Favorited)
                    }else {
                        alert('Favorite 리스트에 추가하는데 실패했습니다.')
                    }
                })
        }
    }


    return (
        <div>
            <button onClick={onClickFavorite}>{Favorited ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber} </button>
        </div>
    )
}

export default Favorite
