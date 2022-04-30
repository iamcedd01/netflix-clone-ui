import Image from 'next/image'
import { FC, useCallback } from 'react'

// Contexts
import { useMovieController } from 'contexts/MovieContext'

import config from 'config'

type Props = {
    movie: Movie
}

const Thumbnail: FC<Props> = ({ movie }) => {
    // Contexts
    const [{ handleShowSummary, handleHideSummary }] = useMovieController()

    // States

    // Functions

    return (
        <div
            onClick={() => handleShowSummary(movie)}
            className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-[165px] md:min-w-[290px] md:hover:scale-105"
        >
            <Image
                layout="fill"
                src={`${config.imageBaseUrl}/w500${movie.backdrop_path || movie.poster_path}`}
                className="rounded-sm object-cover md:rounded"
            />
        </div>
    )
}

export default Thumbnail
