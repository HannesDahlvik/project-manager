import React from 'react'

// Routing
import { Outlet } from 'react-router-dom'

// UI
import { Grid } from '@mantine/core'

const ProfileLayout: React.FC = () => {
    return (
        <Grid>
            <div>navbar</div>

            <Outlet />
        </Grid>
    )
}

export default ProfileLayout
