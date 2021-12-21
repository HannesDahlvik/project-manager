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

const Login: React.FC = () => {
    const emailLogin = trpc.useMutation('auth.login')

    const { classes } = useStyles()

    const form = useForm({
        initialValues: {
            email: '',
            password: ''
        }
    })

    const infoHandler = useInfoHandler()
    const errorHandler = useErrorHandler()

    const navigate = useNavigate()

    const handleEmailLogin = (values: { email: string; password: string }) => {
        emailLogin.mutate(
            {
                email: values.email,
                password: values.password
            },
            {
                onSuccess: (data) => {
                    console.log(data)

                    if (data) {
                        if (data.error) {
                            errorHandler(data.error)
                            return
                        }

                        if (data.user && data.token) {
                            setAuth(data.token, data.user)
                            navigate(`/${data.user.username}/projects`)
                            infoHandler(`Logged in as ${data.user.username}`)
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
                <Title className={classes.title}>Login</Title>

                <form onSubmit={form.onSubmit(handleEmailLogin)}>
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

export default Login

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
