import React from 'react'

// Routing
import { Outlet } from 'react-router'

// UI
import { AppShell, createStyles } from '@mantine/core'

// Components
import PublicNavbar from '../components/public/Navbar'

const PublicLayout: React.FC = () => {
    const { classes } = useStyles()

    return (
        <AppShell className={classes.wrapper} header={<PublicNavbar />}>
            <Outlet />
        </AppShell>
    )
}

export default PublicLayout

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
