import React, { useEffect, useState } from 'react'
import { fetchMovies } from '../http/axios'
import { useAppSelector } from '../Redux/hooks'
import MovieCard from './MovieCard'

export interface IMDB {
    Title: string
    Year: string
    imdbID: string
    Type: string
    Poster: string
}

const Workspace = () => {

    const { text } = useAppSelector(state => state.search)

    const [movieData, setMovieData] = useState<IMDB[] | null>(null)

    useEffect(() => {
        fetchMovies(text).then((data) => {
            setMovieData(data.data)
            console.log(movieData)
        }).catch((err) => {
            console.log(err)
        })
    }, [text])

    return (
        <div>
            {movieData === null ? ( // Show loading message when movieData is null
                <div>Loading...</div>
            ) : movieData && movieData.length > 0 ? ( // Check if movieData is an array with data
                <MovieCard movieData={movieData} />
            ) : (
                <div>No movies found</div>
            )}
        </div>
    )
}

export default Workspace