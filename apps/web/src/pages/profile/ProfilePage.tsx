import React from 'react'

// Logic
import core from '../../logic/core'
import { usePulse } from '@pulsejs/react'

// Routing
import { useNavigate } from 'react-router-dom'

// UI
import { Avatar, Box, Button, createStyles, Paper, Tabs, Text, Title } from '@mantine/core'

// Utils
import getInitials from '../../utils/getInitials'

// Components
import Spinner from '../../components/Spinner'

const ProfilePage: React.FC = () => {
    const user = usePulse(core.state.user)

    const { classes } = useStyles()

    const navigate = useNavigate()

    if (!user) return <Spinner />

    return (
        <Box className={classes.wrapper}>
            <Paper radius="lg" padding="xl" shadow="md" className={classes.topWrapper}>
                <Avatar color="blue" size="xl" sx={{ borderRadius: '100%', minWidth: '164px', minHeight: '164px' }}>
                    {getInitials(user.username)}
                </Avatar>

                <Title sx={{ marginTop: '1rem', fontSize: '2.75rem' }}>{user.username}</Title>
                <Text className={classes.slug}>@{user.slug}</Text>

                <Button size="md" sx={{ marginTop: '1rem' }} onClick={() => navigate('projects')}>
                    Projects
                </Button>
            </Paper>

            <Tabs
                position="center"
                className={classes.tabs}
                styles={(theme) => ({
                    body: {
                        background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[3],
                        height: '100%'
                    }
                })}
            >
                <Tabs.Tab label="User Info">User Data</Tabs.Tab>
                <Tabs.Tab label="Settings">Settings</Tabs.Tab>
            </Tabs>
        </Box>
    )
}

export default ProfilePage

const useStyles = createStyles(({ colorScheme, colors }) => {
    const dark = colorScheme === 'dark'

    return {
        wrapper: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100%'
        },
        topWrapper: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            margin: '0 auto',
            marginTop: '2rem',
            padding: '4rem',
            paddingLeft: '8rem',
            paddingRight: '8rem',
            background: dark ? colors.dark[8] : colors.gray[3]
        },
        slug: {
            color: colors.gray[6]
        },
        tabs: {
            width: '100%',
            height: '100%',
            marginTop: '2rem'
        },
        tab: {
            background: colors.dark[8]
        }
    }
})
