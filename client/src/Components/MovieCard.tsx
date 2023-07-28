import React from 'react'
import { IMBD } from './Workspace'

interface MovieProp {
    data: IMBD
}

const MovieCard: React.FC<MovieProp> = ({ data }) => {
    return (
        <div>MovieCard</div>
    )
}

export default MovieCard