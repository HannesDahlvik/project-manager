import React from 'react'

// Logic
import core from '../../logic/core'
import { usePulse } from '@pulsejs/react'

// Routing
import { useNavigate } from 'react-router-dom'

// UI
import { ActionIcon, Box, Button, createStyles, Group, Title, useMantineColorScheme } from '@mantine/core'
import { Moon, Sun } from 'phosphor-react'

const PublicNavbar: React.FC = () => {
    const user = usePulse(core.state.user)

    const navigate = useNavigate()

    const { colorScheme, toggleColorScheme } = useMantineColorScheme()
    const { classes } = useStyles()
    const dark = colorScheme === 'dark'

    return (
        <Box className={classes.wrapper}>
            <Box>
                <Title
                    sx={{
                        cursor: 'pointer'
                    }}
                    onClick={() => navigate('/')}
                >
                    Project Manager
                </Title>
            </Box>

            <Box className={classes.cta}>
                <Group spacing="sm">
                    <ActionIcon variant="transparent" onClick={() => toggleColorScheme()}>
                        {dark ? <Sun /> : <Moon />}
                    </ActionIcon>

                    {!user ? (
                        <>
                            <Button variant="outline" onClick={() => navigate('/login')}>
                                Login
                            </Button>
                            <Button onClick={() => navigate('/signup')}>Signup</Button>
                        </>
                    ) : (
                        <>
                            <Button variant="outline" onClick={() => core.events.logout.emit()}>
                                Logout
                            </Button>

                            <Button onClick={() => navigate(`/${user.slug}/projects`)}>Projects</Button>
                        </>
                    )}
                </Group>
            </Box>
        </Box>
    )
}

export default PublicNavbar

const useStyles = createStyles((theme) => {
    const dark = theme.colorScheme === 'dark'

    return {
        wrapper: {
            display: 'flex',
            alignItems: 'center',
            background: dark ? theme.colors.dark[8] : theme.colors.gray[3],
            width: '100%',
            height: '84px',
            padding: '0 16px'
        },
        cta: {
            display: 'flex',
            alignItems: 'center',
            marginLeft: 'auto'
        }
    }
})
