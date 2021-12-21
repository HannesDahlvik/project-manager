import React from 'react'

// Logic
import core from '../logic/core'
import { usePulse } from '@pulsejs/react'

// Routing
import { Navigate, useLocation } from 'react-router-dom'

function RequireAuth({ children }: { children: JSX.Element }) {
    const user = usePulse(core.state.user)

    const location = useLocation()

    if (!user) return <Navigate to="/login" state={{ from: location }} />

    return children
}

export default RequireAuth
