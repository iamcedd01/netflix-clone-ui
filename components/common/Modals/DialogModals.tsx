import { useAuthController } from 'contexts/AuthContext'
import { useModalController } from 'contexts/ModalContext'
import { FC, Fragment } from 'react'
import MovieSummaryModal from './MovieSummaryModal'

const DialogModals: FC = () => {
    // Contexts
    const [authState] = useAuthController()
    const [{ modals }] = useModalController()

    // Functions

    return (
        <Fragment>
            {authState.isAuthenticated && <Fragment>{modals.showMovieSummary && <MovieSummaryModal />}</Fragment>}
        </Fragment>
    )
}

export default DialogModals
