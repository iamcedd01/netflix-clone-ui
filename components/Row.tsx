import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { useRef } from 'react'
import { FC } from 'react'
import Thumbnail from './Thumbnail'

type Props = {
  title: string
  movies: Array<Movie>
}

const Row: FC<Props> = ({ title, movies }) => {
  // Contexts

  // States
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState(false)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(false)

  // Functions
  const handleScroll = useCallback((direction: string) => {
    setIsMoved(true)

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current
      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }, [])

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon
          className="rowArrow left-0"
          onClick={() => handleScroll('left')}
        />

        <div
          ref={rowRef}
          className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>

        <ChevronRightIcon
          className="rowArrow right-0"
          onClick={() => handleScroll('right')}
        />
      </div>
    </div>
  )
}

export default Row
