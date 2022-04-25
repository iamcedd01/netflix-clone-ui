import Image from 'next/image'
import { FC } from 'react'

import config from 'config'

type Props = {
  movie: Movie
}

const Thumbnail: FC<Props> = ({ movie }) => {
  // Contexts

  // States

  // Functions

  return (
    <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
      <Image
        layout="fill"
        src={`${config.imageBaseUrl}/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="rounded-sm object-cover md:rounded"
      />
    </div>
  )
}

export default Thumbnail
