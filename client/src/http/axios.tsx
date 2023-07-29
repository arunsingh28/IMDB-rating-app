import axios from "axios";

// local link : http://localhost:4000/api

// Create an instance of axios with a base URL and default headers.
const api = axios.create({
    baseURL: 'https://velozity.blueorbit.app/api',
    headers: {
        "Content-Type": "application/json"
    }
})

// Function to fetch movies by title
export const fetchMovies = async (title: string) => {
    return await api.get(`movies/search?title=${title}`)
}

// Function to add a movie to favorites
export const addToFav = async (data: any) => {
    return await api.post('movies/favorites', data)
}

// Function to remove a movie from favorites by OMDB ID
export const removeFromFav = async (OMDB: string) => {
    return await api.delete(`movies/remove?OMDBID=${OMDB}`)
}

// Function to fetch the list of all favorite movies
export const allFavMoviesList = async () => {
    return await api.get('fav/list')
}