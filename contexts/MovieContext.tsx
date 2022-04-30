import { DocumentData } from 'firebase/firestore'
import { createContext, Dispatch, FC, Reducer, useCallback, useContext, useReducer } from 'react'
import { useModalController } from './ModalContext'

type MovieType = Movie | DocumentData | null

interface State {
    summaryMovie?: MovieType

    handleHideSummary(): void
    handleShowSummary(movie: MovieType): void
}

const initialState: State = {
    summaryMovie: null,
    handleHideSummary: () => {},
    handleShowSummary: () => {},
}

export enum ActionTypes {
    SET_SUMMARY_MOVIE = 'SET_SUMMARY_MOVIE',
}

type Action = { type: ActionTypes.SET_SUMMARY_MOVIE; movie: MovieType }

const reducer: Reducer<State, Action> = (state: State, action: Action) => {
    switch (action.type) {
        case ActionTypes.SET_SUMMARY_MOVIE:
            return { ...state, summaryMovie: action.movie }
        default:
            return state
    }
}

const MovieStateContext = createContext(initialState as State)
const MovieDispatchContext = createContext((() => {}) as Dispatch<Action>)

const MovieProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    // Contexts
    const [modalState, modalDispatch] = useModalController()

    // Functions
    const handleShowSummary = useCallback(
        (movie: Movie | DocumentData) => {
            dispatch({ type: ActionTypes.SET_SUMMARY_MOVIE, movie })
            modalDispatch({ ...modalState, modals: { ...modalState.modals, showMovieSummary: true } })
        },
        [dispatch, modalState, modalDispatch]
    )

    const handleHideSummary = useCallback(() => {
        dispatch({ type: ActionTypes.SET_SUMMARY_MOVIE, movie: null })
        modalDispatch({ ...modalState, modals: { ...modalState.modals, showMovieSummary: false } })
    }, [dispatch, modalState, modalDispatch])

    return (
        <MovieStateContext.Provider value={{ ...state, handleHideSummary, handleShowSummary }}>
            <MovieDispatchContext.Provider value={dispatch}>{children}</MovieDispatchContext.Provider>
        </MovieStateContext.Provider>
    )
}

function useMovieState() {
    const context = useContext(MovieStateContext)
    if (context === undefined) {
        throw new Error('useMovieState must be used within a MovieProvider')
    }

    return context
}

function useMovieDispatch() {
    const context = useContext(MovieDispatchContext)
    if (context === undefined) {
        throw new Error('useMovieDispatch must be used within a MovieProvider')
    }
    return context
}

function useMovieController(): [State, Dispatch<Action>] {
    return [useMovieState(), useMovieDispatch()]
}

export { MovieProvider, useMovieController }
