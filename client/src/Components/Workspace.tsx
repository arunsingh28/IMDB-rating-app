import React, { useEffect, useState } from 'react'
import { fetchMovies } from '../http/axios'
import { useAppSelector, useAppDispatch } from '../Redux/hooks'
import { changeLoadingState } from '../Redux/slice/loading.slice'
import MovieCard from './MovieCard'
import { Skelton } from '../Components/Skelton'
import Suggestion from './Suggestion'

export interface OMDB {
    Title: string
    Year: string
    OMDBID: string
    Type: string
    Poster: string
    fav: boolean
}

const Workspace = () => {

    const dispatch = useAppDispatch()

    const { text } = useAppSelector(state => state.search)

    const [movieData, setMovieData] = useState<OMDB[] | null>(null)


    // Define a function to fetch movies after a certain delay (e.g., 500ms)
    const debounceFetchMovies = (searchText: string) => {
        // Clear any previous timers
        clearTimeout(300);

        // Set a new timer to fetch movies after 500ms of user inactivity
        const timer = setTimeout(() => {
            fetchMovies(searchText)
                .then((data) => {
                    // change loading state
                    dispatch(changeLoadingState({
                        isLoad: false
                    }))
                    // Sort data according to Year
                    const sortedData = data.data.sort((a: OMDB, b: OMDB) => parseInt(b.Year) - parseInt(a.Year));
                    setMovieData(sortedData);
                })
                .catch((err) => {
                    setMovieData([]); // Set movieData to an empty array in case of an error
                });
        }, 300);
    };


    useEffect(() => {
        // Fetch movies using the debounced function
        debounceFetchMovies(text);

        // Cleanup function to clear any timers when the component unmounts
        return () => clearTimeout(300);
    }, [text]);

    return (
        <div className='font-poppins mt-5'>
            {movieData === null ? ( // Show loading message when movieData is null
                <Skelton />
            ) : movieData && movieData.length > 0 ? ( // Check if movieData is an array with data
                <MovieCard direction='justify-center' movieData={movieData} />
            ) : (
                <Suggestion />
            )}
        </div>
    )
}

export default Workspace