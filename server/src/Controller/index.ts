import express from 'express'
import axios from 'axios'
import { readFile } from '../utils/functions'

export const addFavMovies = async (req: express.Request, res: express.Response) => {
    // get imdbID 
    const { imdbID } = req.query

}

export const removeFavMovies = async (req: express.Request, res: express.Response) => {
    // get imdbID 
    const { imdbID } = req.query

}

export const searchMovies = async (req: express.Request, res: express.Response) => {
    // call IMDB api
    const { title } = req.query
    try {
        const fetchData = await axios.get(`http://www.omdbapi.com/?apikey=6b4f8623&s=${title}`)
        if (fetchData.data.Response === 'False') {
            return res.status(200).json(fetchData.data.Error)
        } else {
            // check if imbdID present in DB then add label fav to true
            const fileContent = await readFile()
            // read file 
            fetchData.data.Search.map((item: any) => {
                for (const fileimdbId of fileContent) {
                    if (fileimdbId.imdbID === item.imdbID) {
                        console.log('match')
                        // return data with adding fav label to moves
                        return res.status(200).json(fetchData.data.Search)
                    } else {
                        console.log('not match ')
                    }
                }
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(404).json({ msg: 'Server Fail' })
    }
}
