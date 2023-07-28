import express from 'express'
import cors from 'cors'
import { errorHandler } from './utils/errorHandler'
import { createFile } from './utils/functions'
import { searchMovies, addFavMovies, removeFavMovies } from './Controller/index'

(async function () {
    const PORT = process.env.PORT || 4000
    const app = express()

    // error
    errorHandler()

    const coreOption = {
        origin: "*",
    }
    app.use(cors(coreOption))

    // create file if not exist
    createFile()

    // routes
    app.get('/api/movies/search', searchMovies)
    app.post('/api/movies/favorites', addFavMovies)
    app.get('/api/movies/remove', removeFavMovies)

    app.listen(PORT, () => {
        console.log(`🚀 Query endpoint ready at http://localhost:${PORT}`)
    })
})()