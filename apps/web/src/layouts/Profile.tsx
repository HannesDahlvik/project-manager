import React from 'react'

// Routing
import { Outlet } from 'react-router-dom'

// UI
import { AppShell, createStyles } from '@mantine/core'

// Components
import ProfileNavbar from '../components/profile/ProfileNavbar'

const ProfileLayout: React.FC = () => {
    const { classes } = useStyles()

    return (
        <AppShell
            padding={0}
            className={classes.wrapper}
            header={<ProfileNavbar />}
            styles={(theme) => ({
                body: {
                    height: '100%'
                }
            })}
        >
            <Outlet />
        </AppShell>
    )
}

export default ProfileLayout

const useStyles = createStyles((theme) => {
    const dark = theme.colorScheme === 'dark'
    const colors = theme.colors

    return {
        wrapper: {
            background: dark ? colors.dark[7] : '',
            height: '100vh'
        }
    }
})
