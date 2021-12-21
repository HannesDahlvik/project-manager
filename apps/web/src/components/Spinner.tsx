import React from 'react'

import { Box, createStyles, Loader } from '@mantine/core'

const Spinner: React.FC = () => {
    const { classes } = useStyles()

    return (
        <Box className={classes.wrapper}>
            <Loader size="lg" />
        </Box>
    )
}

export default Spinner

const useStyles = createStyles(() => {
    return {
        wrapper: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            paddingTop: '5rem'
        }
    }
})
