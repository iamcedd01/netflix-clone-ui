import Head from 'next/head'
import { FC, useCallback, useState } from 'react'

// Components
import Image from 'next/image'
import { useAuthController, ActionTypes as AuthActionTypes } from 'contexts/AuthContext'

// Utils
import { auth } from 'config/firebase'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

interface Inputs {
    email: string
    password: string
}

const Login: FC = () => {
    const router = useRouter()

    // Contexts
    const [, authDispatch] = useAuthController()

    // States
    const [loading, setLoading] = useState(false)
    const [login, setLogin] = useState(false)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    // Functions
    const handleSignUp = useCallback(async (email: string, password: string) => {
        setLoading(true)

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                authDispatch({
                    type: AuthActionTypes.SET_USER,
                    user: userCredential.user,
                })
                router.push('/')
            })
            .catch((error) => console.log(error.message))
            .finally(() => setLoading(false))
    }, [])

    const handleSignIn = useCallback(async (email: string, password: string) => {
        setLoading(true)

        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                authDispatch({
                    type: AuthActionTypes.SET_USER,
                    user: userCredential.user,
                })
                router.push('/')
            })
            .catch((error) => console.log(error.message))
            .finally(() => setLoading(false))
    }, [])

    const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
        if (login) {
            // await signIn(email, password)
            await handleSignIn(email, password)
        } else {
            // await signUp(email, password)
            await handleSignUp(email, password)
        }
    }

    return (
        <div className="relative flex h-screen w-screen flex-col bg-dark md:items-center md:justify-center md:bg-transparent">
            <Head>
                <title>Netflix</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Image
                layout="fill"
                objectFit="cover"
                src="https://rb.gy/p2hphi"
                className="-z-10 !hidden opacity-60 sm:!inline"
            />

            <img
                width={150}
                height={150}
                alt="Netflix"
                src="https://rb.gy/ulxxee"
                className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
            />

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative mt-24 space-y-8 rounded bg-dark/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
            >
                <h1 className="text-4xl font-semibold">Sign In</h1>
                <div className="space-y-4">
                    <label className="inline-block w-full">
                        <input
                            type="email"
                            className="input"
                            placeholder="Email"
                            {...register('email', { required: true })}
                        />
                        {errors.email && (
                            <p className="p-1 text-[13px] font-light text-orange-500">Please enter a valid email</p>
                        )}
                    </label>
                    <label className="inline-block w-full">
                        <input
                            type="password"
                            className="input"
                            placeholder="Password"
                            {...register('password', { required: true })}
                        />
                        {errors.password && (
                            <p className="p-1 text-[13px] font-light text-orange-500">
                                Your password must contain between 4 and 60 characters.
                            </p>
                        )}
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full rounded bg-[#e50914] py-3 font-semibold"
                    onClick={() => setLogin(true)}
                >
                    Sign In
                </button>

                <div className="text-center text-[gray]">
                    New to Netflix?{' '}
                    <button onClick={() => setLogin(false)} className="text-white hover:underline">
                        Sign up now
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login
