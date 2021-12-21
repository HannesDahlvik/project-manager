import React from 'react'

// Routing
import { Link, useLocation } from 'react-router-dom'

// UI
import { Box, Button, Code, createStyles, Divider, Title } from '@mantine/core'

const NoMatch: React.FC = () => {
    const location = useLocation()

    const { classes } = useStyles()

    return (
        <Box className={classes.wrapper}>
            <Box className={classes.smallWrapper}>
                <Title className={classes.titleOne}>404</Title>
                <Title order={2} className={classes.titleTwo}>
                    No match for <Code className={classes.location}>{location.pathname}</Code>
                </Title>

                <Divider
                    sx={{
                        marginBottom: '1.75rem'
                    }}
                />

                <Button component={Link} to="/" size="lg">
                    HOME
                </Button>
            </Box>
        </Box>
    )
}

export default NoMatch

const useStyles = createStyles(() => {
    return {
        wrapper: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '100px'
        },
        smallWrapper: {
            width: '400px',
            textAlign: 'center'
        },
        titleOne: {
            fontSize: '4rem',
            marginBottom: '0.5rem'
        },
        titleTwo: {
            marginBottom: '1rem'
        },
        location: {
            fontSize: '100%'
        }
    }
})
