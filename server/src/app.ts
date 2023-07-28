import express from 'express'
import cors from 'cors'
import { errorHandler } from './utils/errorHandler'

(async function () {
    const PORT = process.env.PORT || 4000
    const app = express()

    // error
    errorHandler

    const coreOption = {
        origin: "*",
    }
    app.use(cors(coreOption))
    app.listen(PORT, () => {
        console.log(`🚀 Query endpoint ready at http://localhost:${PORT}`)
    })
})()