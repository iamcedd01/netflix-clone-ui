import { FC, Fragment } from 'react'

// Components
import { XIcon } from '@heroicons/react/outline'
import MuiModal, { ModalProps as MuiModalProps } from '@mui/material/Modal'

type Props = Omit<MuiModalProps, 'onClose' | 'children'> & {
    handleClose?: () => void
    showCloseButton?: boolean
}

const Modal: FC<Props> = ({ children, showCloseButton = true, handleClose, ...props }) => {
    return (
        <MuiModal
            {...props}
            onClose={handleClose}
            className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
        >
            <Fragment>
                {showCloseButton && (
                    <button
                        className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-dark hover:bg-dark"
                        onClick={handleClose}
                    >
                        <XIcon className="h-6 w-6" />
                    </button>
                )}
                {children}
            </Fragment>
        </MuiModal>
    )
}

export default Modal
