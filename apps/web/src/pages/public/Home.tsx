import React from 'react'

// UI
import { Container, Title } from '@mantine/core'

// Utils
import { trpc } from '../../utils/trpc'

// Components
import Spinner from '../../components/Spinner'

const Home: React.FC = () => {
    const test = trpc.useQuery(['api.test'])

    if (!test.data) return <Spinner />

    return (
        <Container size="xl">
            <Title>{test.data.text}</Title>
        </Container>
    )
}

export default Home
