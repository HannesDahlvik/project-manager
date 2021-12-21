import React from 'react'

// Routing
import { useNavigate } from 'react-router-dom'

// UI
import { ActionIcon, Box, createStyles, Title, useMantineColorScheme } from '@mantine/core'
import { Moon, Sun } from 'phosphor-react'

const ProfileNavbar: React.FC = () => {
    const { classes } = useStyles()

    const navigate = useNavigate()

    const { colorScheme, toggleColorScheme } = useMantineColorScheme()

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
                <ActionIcon variant="transparent" onClick={() => toggleColorScheme()}>
                    {colorScheme === 'dark' ? <Sun /> : <Moon />}
                </ActionIcon>
            </Box>
        </Box>
    )
}

export default ProfileNavbar

const useStyles = createStyles((theme) => {
    const dark = theme.colorScheme === 'dark'
    const colors = theme.colors

    return {
        wrapper: {
            display: 'flex',
            alignItems: 'center',
            background: dark ? colors.dark[8] : colors.gray[3],
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
