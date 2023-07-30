import express from 'express'
import axios from 'axios'
import { readFile, insertRecord, deleteRecord } from '../utils/functions'

export const addFavMovies = async (req: express.Request, res: express.Response) => {
    // save it to file db
    const isInsert = await insertRecord(req.body)
    // send clinet success message
    return res.status(200).json(isInsert)
}

export const removeFavMovies = async (req: express.Request, res: express.Response) => {
    // get OMDBID 
    const { imdbID } = req.query
    const isRemove = await deleteRecord(imdbID as string)
    return res.status(200).json(isRemove)
}

export const favoriteMovie = async (req: express.Request, res: express.Response) => {
    const favMoviesList = readFile()
    return res.status(200).json(favMoviesList)
}

export const searchMovies = async (req: express.Request, res: express.Response) => {
    // call OMDB api
    const { title } = req.query
    try {
        const fetchData = await axios.get(`http://www.omdbapi.com/?apikey=6b4f8623&s=${title}`)
        if (fetchData.data.Response === 'False') {
            return res.status(200).json(fetchData.data.Error)
        } else {
            // check if imbdID present in DB then add label fav to true
            const fileContent = readFile()
            const searchResults = fetchData.data.Search.map((item: any) => {
                const isFav = fileContent.some((fileItem: any) => fileItem.OMDBID === item.OMDBID);
                return { ...item, fav: isFav };
            });
            return res.status(200).json(searchResults);
        }
    } catch (error) {
        console.log(error)
        return res.status(404).json({ msg: 'Server Fail' })
    }
}
