import axios from "axios";

const api = axios.create({
    baseURL: 'http://3.108.59.157:4000/api',
    headers: {
        "Content-Type": "application/json"
    }
})

export const fetchMovies = async (title: string) => {
    return await api.get(`movies/search?title=${title}`)
}

export const addToFav = async (data: any) => {
    return await api.post('movies/favorites', data)
}

export const removeFromFav = async (imdb: string) => {
    return await api.delete(`movies/remove?imdbID=${imdb}`)
}

export const allFavMoviesList = async () => {
    return await api.get('fav/list')
}