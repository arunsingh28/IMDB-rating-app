import express from 'express'
import cors from 'cors'
import { errorHandler } from './utils/errorHandler'
import { searchMovies, addFavMovies, removeFavMovies, favoriteMovie } from './Controller/index'

(async function () {
    const PORT = process.env.PORT || 4000
    const app = express()

    // error
    errorHandler()

    const coreOption = {
        origin: "*",
    }
    app.use(cors(coreOption))


    // body parser
    app.use(express.json())

    // routes
    app.get('/api/movies/search', searchMovies)
    app.post('/api/movies/favorites', addFavMovies)
    app.delete('/api/movies/remove', removeFavMovies)
    app.get('/api/fav/list', favoriteMovie)

    app.listen(PORT, () => {
        console.log(`🚀 server listen at http://localhost:${PORT}`)
    })
})()