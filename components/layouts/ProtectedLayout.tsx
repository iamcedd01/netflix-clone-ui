import { FC, useEffect } from 'react'

// Contexts
import { useAuthController } from 'contexts/AuthContext'
import { useModalController } from 'contexts/ModalContext'

// Utils
import { useRouter } from 'next/router'

const ProtectedLayout: FC = ({ children }) => {
    const router = useRouter()

    // Contexts
    const [authState] = useAuthController()
    const [modalState] = useModalController()

    // Functions
    useEffect(() => {
        if (!authState.user && !authState.authLoading) {
            router.push('/login')
        }
    }, [authState.user, authState.authLoading])

    return (
        <div className={`relative h-full w-full ${modalState.show && 'max-h-screen overflow-hidden'}`}>{children}</div>
    )
}

export default ProtectedLayout
