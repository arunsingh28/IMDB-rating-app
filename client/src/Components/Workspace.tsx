import React, { useEffect, useState } from 'react'
import { fetchMovies } from '../http/axios'
import { useAppSelector } from '../Redux/hooks'
import MovieCard from './MovieCard'

export interface IMBD {
    Title: string
    Year: string
    imdbID: string
    Type: string
    Poster: string
}

const Workspace = () => {

    const { text } = useAppSelector(state => state.search)

    const [movieData, setMovieData] = useState<IMBD[]>()

    useEffect(() => {
        fetchMovies(text).then((data) => {
            setMovieData(data.data.Search)
        }).catch((err) => {
            console.log(err)
        })
    }, [text])

    return (
        <div>
            <MovieCard data={movieData} />
        </div>
    )
}

export default Workspace