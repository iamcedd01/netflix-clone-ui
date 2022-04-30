import { FC, useEffect, useState } from 'react'

// Components
import ReactPlayer from 'react-player/lazy'
import Modal from 'components/controls/Modal'

// Contexts
import { useModalController } from 'contexts/ModalContext'
import { useMovieController } from 'contexts/MovieContext'

// Utils
import config from 'config'
import { FaPlay } from 'react-icons/fa'
import { PlusIcon, ThumbUpIcon as ThumbUpIconOutline } from '@heroicons/react/outline'
import { VolumeOffIcon, VolumeUpIcon } from '@heroicons/react/solid'

const MovieSummaryModal: FC = () => {
    // Contexts
    const [modalState] = useModalController()
    const [{ summaryMovie, handleHideSummary }] = useMovieController()

    // States
    const [muted, setMuted] = useState(true)
    const [trailer, setTrailer] = useState('')
    const [genres, setGenres] = useState<Genre[]>([])

    // Functions
    useEffect(() => {
        if (!summaryMovie) return

        async function fetchMovie() {
            const { apiBaseUrl, apiKey } = config
            const media_type = summaryMovie?.media_type === 'tv' ? 'tv' : 'movie'
            const data = await fetch(
                `${apiBaseUrl}/${media_type}/${summaryMovie?.id}?api_key=${apiKey}&language=en-US&append_to_response=videos`
            ).then((res) => res.json())

            if (data?.videos) {
                const trailer = data.videos.results.find((element: Element) => element.type === 'Trailer')
                setTrailer(trailer?.key || '')
            }

            if (data?.genres) {
                setGenres(data.genres || [])
            }
        }

        fetchMovie()
    }, [summaryMovie])

    return (
        <Modal
            handleClose={handleHideSummary}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            open={!!modalState.modals.showMovieSummary}
        >
            <div className="relative pt-[52.25%]">
                <ReactPlayer
                    width="100%"
                    height="100%"
                    url={`https://www.youtube.com/watch?v=${trailer}`}
                    playing
                    muted={muted}
                    style={{ position: 'absolute', top: 0, left: 0 }}
                />
                <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
                    <div className="flex space-x-2">
                        <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-dark transition hover:bg-[#e6e6e6]">
                            <FaPlay className="h-7 w-7 text-dark" />
                            Play
                        </button>

                        <button className="modalButton">
                            <PlusIcon className="h-7 w-7" />
                        </button>

                        <button className="modalButton">
                            <ThumbUpIconOutline className="h-7 w-7" />
                        </button>
                    </div>

                    <button className="modalButton" onClick={() => setMuted(!muted)}>
                        {muted ? <VolumeOffIcon className="h-6 w-6" /> : <VolumeUpIcon className="h-6 w-6" />}
                    </button>
                </div>
            </div>
            <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
                <div className="space-y-6 text-lg">
                    <div className="flex items-center space-x-2 text-sm">
                        <p className="font-semibold text-green-400">{summaryMovie!.vote_average * 10}% Match</p>
                        <p className="font-light">{summaryMovie?.release_date || summaryMovie?.first_air_date}</p>
                        <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-sm">
                            HD
                        </div>
                    </div>
                    <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
                        <p className="w-5/6">{summaryMovie?.overview}</p>
                        <div className="flex flex-col space-y-3 text-sm">
                            <div>
                                <span className="text-[gray]">Genres: </span>
                                {genres.map((genre) => genre.name).join(', ')}
                            </div>
                            <div>
                                <span className="text-[gray]">Original language: </span>
                                {summaryMovie?.original_language}
                            </div>
                            <div>
                                <span className="text-[gray]">Total votes: </span>
                                {summaryMovie?.vote_count}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default MovieSummaryModal
