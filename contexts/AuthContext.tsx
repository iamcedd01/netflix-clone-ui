import { createContext, Dispatch, FC, Reducer, useCallback, useContext, useEffect, useReducer } from 'react'

// Utils
import { auth } from 'config/firebase'
import { useRouter } from 'next/router'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'

interface State {
    user?: User | null
    authLoading: boolean
    handleLogout(): void
    isAuthenticated: boolean
}

const initialState: State = {
    user: null,
    authLoading: true,
    isAuthenticated: false,
    handleLogout: () => {},
}

export enum ActionTypes {
    SET_USER = 'SET_USER',
    SET_LOADING = 'LOADING',
}

type Action =
    | {
          type: ActionTypes.SET_USER
          user: User | null
      }
    | {
          type: ActionTypes.SET_LOADING
          loading: boolean
      }

const reducer: Reducer<State, Action> = (state: State, action: Action) => {
    switch (action.type) {
        case ActionTypes.SET_USER:
            return { ...state, user: action.user, isAuthenticated: !!action.user }
        case ActionTypes.SET_LOADING:
            return { ...state, authLoading: action.loading }
        default:
            return state
    }
}

const AuthStateContext = createContext(initialState as State)
const AuthDispatchContext = createContext((() => {}) as Dispatch<Action>)

const AuthProvider: FC = ({ children }) => {
    const router = useRouter()
    const [state, dispatch] = useReducer(reducer, initialState)

    // Functions
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch({ type: ActionTypes.SET_USER, user })
            } else {
                dispatch({ type: ActionTypes.SET_USER, user: null })
                router.push('/login')
            }
            dispatch({ type: ActionTypes.SET_LOADING, loading: false })
        })
    }, [auth])

    const handleLogout = useCallback(() => {
        dispatch({ type: ActionTypes.SET_LOADING, loading: true })
        signOut(auth)
            .then(() => dispatch({ type: ActionTypes.SET_USER, user: null }))
            .catch((error) => console.log(error))
            .finally(() => dispatch({ type: ActionTypes.SET_LOADING, loading: false }))
    }, [auth])

    return (
        <AuthStateContext.Provider value={{ ...state, handleLogout }}>
            <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    )
}

function useAuthState() {
    const context = useContext(AuthStateContext)
    if (context === undefined) {
        throw new Error('useAuthState must be used within a AuthProvider')
    }

    return context
}

function useAuthDispatch() {
    const context = useContext(AuthDispatchContext)
    if (context === undefined) {
        throw new Error('useAuthDispatch must be used within a AuthProvider')
    }
    return context
}

function useAuthController(): [State, Dispatch<Action>] {
    return [useAuthState(), useAuthDispatch()]
}

export { AuthProvider, useAuthController }
