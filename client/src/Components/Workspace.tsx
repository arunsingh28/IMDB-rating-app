import React, { useEffect, useState } from 'react'
import { fetchMovies } from '../http/axios'
import { useAppSelector, useAppDispatch } from '../Redux/hooks'
import { changeLoadingState } from '../Redux/slice/loading.slice'
import MovieCard from './MovieCard'
import { Skelton } from '../Components/Skelton'

export interface IMDB {
    Title: string
    Year: string
    imdbID: string
    Type: string
    Poster: string
}

const Workspace = () => {

    const dispatch = useAppDispatch()

    const { text } = useAppSelector(state => state.search)

    const [movieData, setMovieData] = useState<IMDB[] | null>(null)


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
                    setMovieData(data.data);
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
                <MovieCard movieData={movieData} />
            ) : (
                <div>No movies found</div>
            )}
        </div>
    )
}

export default Workspace