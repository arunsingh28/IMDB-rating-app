import axios from "axios";

const api = axios.create({
    baseURL: 'http://www.omdbapi.com',
})

export const fetchMovies = async (title: string) => {
    return await api.get(`?apikey=6b4f8623&s=${title}`)
}