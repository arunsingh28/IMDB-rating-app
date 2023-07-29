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
                    // Sort data according to Year
                    const sortedData = data.data.sort((a: IMDB, b: IMDB) => parseInt(b.Year) - parseInt(a.Year));
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
                <MovieCard movieData={movieData} />
            ) : (
                <p className='bg-gray-100 px-32 py-3 rounded-md text-gray-600 flex items-center gap-1 hover:shadow-md'>No <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44Z" stroke="black" stroke-width="4" stroke-linejoin="round" />
                    <path d="M24 18C24.7956 18 25.5587 17.6839 26.1213 17.1213C26.6839 16.5587 27 15.7956 27 15C27 14.2044 26.6839 13.4413 26.1213 12.8787C25.5587 12.3161 24.7956 12 24 12C23.2044 12 22.4413 12.3161 21.8787 12.8787C21.3161 13.4413 21 14.2044 21 15C21 15.7956 21.3161 16.5587 21.8787 17.1213C22.4413 17.6839 23.2044 18 24 18ZM24 36C24.7956 36 25.5587 35.6839 26.1213 35.1213C26.6839 34.5587 27 33.7956 27 33C27 32.2044 26.6839 31.4413 26.1213 30.8787C25.5587 30.3161 24.7956 30 24 30C23.2044 30 22.4413 30.3161 21.8787 30.8787C21.3161 31.4413 21 32.2044 21 33C21 33.7956 21.3161 34.5587 21.8787 35.1213C22.4413 35.6839 23.2044 36 24 36ZM15 27C15.7956 27 16.5587 26.6839 17.1213 26.1213C17.6839 25.5587 18 24.7956 18 24C18 23.2044 17.6839 22.4413 17.1213 21.8787C16.5587 21.3161 15.7956 21 15 21C14.2044 21 13.4413 21.3161 12.8787 21.8787C12.3161 22.4413 12 23.2044 12 24C12 24.7956 12.3161 25.5587 12.8787 26.1213C13.4413 26.6839 14.2044 27 15 27ZM33 27C33.7956 27 34.5587 26.6839 35.1213 26.1213C35.6839 25.5587 36 24.7956 36 24C36 23.2044 35.6839 22.4413 35.1213 21.8787C34.5587 21.3161 33.7956 21 33 21C32.2044 21 31.4413 21.3161 30.8787 21.8787C30.3161 22.4413 30 23.2044 30 24C30 24.7956 30.3161 25.5587 30.8787 26.1213C31.4413 26.6839 32.2044 27 33 27Z" stroke="black" stroke-width="4" stroke-linejoin="round" />
                    <path d="M24 44H44" stroke="gray" stroke-width="4" stroke-linecap="round" />
                </svg> Movies found</p>
            )}
        </div>
    )
}

export default Workspace