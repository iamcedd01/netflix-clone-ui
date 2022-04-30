import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from 'contexts/AuthContext'
import { ModalProvider } from 'contexts/ModalContext'
import DialogModals from 'components/common/Modals/DialogModals'
import { MovieProvider } from 'contexts/MovieContext'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ModalProvider>
            <MovieProvider>
                <AuthProvider>
                    <Component {...pageProps} />
                    <DialogModals />
                </AuthProvider>
            </MovieProvider>
        </ModalProvider>
    )
}

export default MyApp
