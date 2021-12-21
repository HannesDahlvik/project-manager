import React, { useEffect, useState } from 'react'

// Logic
import core from './logic/core'
import { useEvent, usePulse } from '@pulsejs/react'

// Routing
import { Route, Routes, useNavigate } from 'react-router-dom'
import RequireAuth from './components/RequireAuth'

// Layouts
import PublicLayout from './layouts/Public'
import ProfileLayout from './layouts/Profile'

// Pages
import NoMatch from './pages/NoMatch'

// Public pages
import Home from './pages/public/Home'
import Login from './pages/public/Login'
import Signup from './pages/public/Signup'

// Profile pages
import ProfilePage from './pages/profile/ProfilePage'

// Utils
import { trpc } from './utils/trpc'
import { useErrorHandler } from './utils/handlers'
import { logout, setAuth } from './utils/auth'

// Components
import Spinner from './components/Spinner'

const AppRoutes: React.FC = () => {
    const user = usePulse(core.state.user)

    const verify = trpc.useMutation(['auth.verify'])

    const navigate = useNavigate()

    const errorHandler = useErrorHandler()

    const [render, setRender] = useState(false)

    useEvent(core.events.logout, () => {
        logout()
        navigate('/')
    })

    useEffect(() => {
        if (localStorage.token) {
            verify.mutate(
                {
                    token: localStorage.token
                },
                {
                    onSuccess: (data) => {
                        if (data) {
                            if (data.error) errorHandler(data.error)

                            if (data.decoded) {
                                setAuth(localStorage.token, data.decoded.user)
                                if (!location.pathname.includes(data.decoded.user.slug))
                                    navigate(`/${data.decoded.user.slug}/projects`)

                                const currentTime = Date.now() / 1000
                                if (data.decoded.exp < currentTime) {
                                    logout()
                                    navigate('/login')
                                }
                            }

                            setRender(true)
                        }
                    },
                    onError: (err) => {
                        errorHandler(err.message)
                    }
                }
            )
        }
    }, [])

    if (!render) return <Spinner />

    return (
        <Routes>
            <Route path="/" element={<PublicLayout />}>
                <Route index element={<Home />} />

                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />

                <Route path="*" element={<NoMatch />} />
            </Route>

            {user ? (
                <>
                    <Route
                        path={`/${user.slug}`}
                        element={
                            <RequireAuth>
                                <ProfileLayout />
                            </RequireAuth>
                        }
                    >
                        <Route index element={<ProfilePage />} />

                        <Route path="*" element={<NoMatch />} />
                    </Route>
                </>
            ) : (
                <></>
            )}
        </Routes>
    )
}

export default AppRoutes
