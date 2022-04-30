import { createContext, Dispatch, FC, useContext, useEffect, useState } from 'react'

interface State {
    show?: boolean
    modals: Record<string, boolean | null>
    // data?: Record<string, string | boolean | number | null> | null
}

const initialState: State = {
    show: false,
    modals: {
        showMovieSummary: false,
    },
}

const ModalStateContext = createContext(initialState as State)
const ModalDispatchContext = createContext((() => {}) as Dispatch<State>)

const ModalProvider: FC = ({ children }) => {
    const [state, dispatch] = useState(initialState)

    useEffect(() => {
        const show = Object.values(state.modals).some((val) => val)
        dispatch((prevState) => ({ ...prevState, show }))
    }, [state.modals])

    return (
        <ModalStateContext.Provider value={state}>
            <ModalDispatchContext.Provider value={dispatch}>{children}</ModalDispatchContext.Provider>
        </ModalStateContext.Provider>
    )
}

function useModalState() {
    const context = useContext(ModalStateContext)
    if (context === undefined) {
        throw new Error('useModalState must be used within a ModalProvider')
    }

    return context
}

function useModalDispatch() {
    const context = useContext(ModalDispatchContext)
    if (context === undefined) {
        throw new Error('useModalDispatch must be used within a ModalProvider')
    }
    return context
}

function useModalController(): [State, Dispatch<State>] {
    return [useModalState(), useModalDispatch()]
}

export { ModalProvider, useModalController }
