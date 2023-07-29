import React, { useState, useEffect } from 'react'
import { fetchMovies } from '../http/axios'
import { OMDB } from './Favourite'
import { toast } from 'react-toastify'
import Loading from './Loading'
import MovieCard from './MovieCard'

const suggestedMovies = [
    'Guns Akimbo',
    'Space',
    'Ligth',
    'john wick',
    'The Spy'
]

const Suggestion = () => {

    const [suggestMovie, setSuggestMovies] = useState<OMDB[]>()

    // choose randmon word index
    const chooseRandmonMovies = () => {
        const randomIndex = Math.floor(Math.random() * suggestedMovies.length)
        return suggestedMovies[randomIndex]
    }


    // fetch data from server
    const fetchData = async (randomMovieName: string) => {
        await fetchMovies(randomMovieName).then((data) => {
            setSuggestMovies(data.data)
        }).catch((err) => {
            toast.error('Error while fetching data', {
                theme: 'dark',
                position: 'bottom-left'
            })
        })
    }

    // call api and change title of page
    useEffect(() => {
        const randomMovieName = chooseRandmonMovies()
        document.title = randomMovieName
        fetchData(randomMovieName)
    }, [])

    return (
        <div>
            <h1 className='text-xl pl-12 font-semibold text-gray-600'>Top Rated Movies</h1>
            {suggestMovie === null ? (
                // Show loading message when movieData is null
                <Loading height={5} width={5} />
            ) : suggestMovie && suggestMovie.length > 0 ? (
                // Check if movieData is an array with data
                <MovieCard direction='justify-start' movieData={suggestMovie} />
            ) : (
                null
            )}
        </div>
    )
}

export default Suggestion