import React from 'react'

// Routing
import { useNavigate } from 'react-router-dom'

// UI
import { Box, Button, createStyles, Input, InputWrapper, Text, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/hooks'

// Utils
import { useInfoHandler, useErrorHandler } from '../../utils/handlers'
import { trpc } from '../../utils/trpc'
import { setAuth } from '../../utils/auth'
import createSlug from '../../utils/createSlug'

const Signup: React.FC = () => {
    const emailLogin = trpc.useMutation('auth.signup')

    const { classes } = useStyles()

    const form = useForm({
        initialValues: {
            username: '',
            email: '',
            password: ''
        }
    })

    const infoHandler = useInfoHandler()
    const errorHandler = useErrorHandler()

    const navigate = useNavigate()

    const handleEmailLogin = (values: { username: string; email: string; password: string }) => {
        const slug = createSlug(values.username)

        emailLogin.mutate(
            {
                username: values.username,
                slug,
                email: values.email,
                password: values.password
            },
            {
                onSuccess: (data) => {
                    if (data) {
                        if (data.error) {
                            errorHandler(data.error)
                            return
                        }

                        if (data.user && data.token) {
                            setAuth(data.token, data.user)
                            navigate(`/${data.user.username}/projects`)
                            infoHandler(`Singed up as ${data.user.username}`)
                            return
                        }
                    }
                },
                onError: (err) => {
                    errorHandler(err.message)
                }
            }
        )
    }

    return (
        <Box className={classes.wrapper}>
            <Box className={classes.authWrapper}>
                <Title className={classes.title}>Signup</Title>

                <form onSubmit={form.onSubmit(handleEmailLogin)}>
                    <InputWrapper className={classes.inputWrapper} required label="Username">
                        <TextInput placeholder="John Doe" {...form.getInputProps('username')} />
                    </InputWrapper>

                    <InputWrapper className={classes.inputWrapper} required label="Email">
                        <TextInput placeholder="your@email.com" {...form.getInputProps('email')} />
                    </InputWrapper>

                    <InputWrapper className={classes.inputWrapper} required label="Password">
                        <Input type="password" placeholder="********" {...form.getInputProps('password')} />
                    </InputWrapper>

                    <Button
                        type="submit"
                        sx={{
                            width: '100%'
                        }}
                        onClick={form.onSubmit(handleEmailLogin)}
                    >
                        Submit
                    </Button>
                    {emailLogin.error && <Text>Something went wrong! {emailLogin.error.message}</Text>}
                </form>
            </Box>
        </Box>
    )
}

export default Signup

const useStyles = createStyles(({ colorScheme, colors }) => {
    const dark = colorScheme === 'dark'

    return {
        wrapper: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        authWrapper: {
            display: 'flex',
            flexDirection: 'column',
            width: '450px',
            marginTop: '6rem',
            padding: '4rem',
            borderRadius: '8px',
            background: dark ? colors.dark[8] : colors.gray[3]
        },
        title: {
            textAlign: 'center',
            marginBottom: '2.5rem'
        },
        inputWrapper: {
            marginBottom: '1rem'
        }
    }
})
