import { createRouter } from '../utils/createRouter'
import config from '../config/config'

import User from '../models/user'

// Utils
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const authRoute = createRouter()
    .mutation('verify', {
        input: z.object({
            token: z.string()
        }),
        resolve({ input }) {
            const { token } = input

            if (!token)
                return {
                    error: 'Unauthorized: No token provided'
                }
            else {
                const decoded: any = jwt.verify(token, config.jwtSecret)

                if (!decoded)
                    return {
                        error: 'Unauthorized: Invalid token'
                    }
                else {
                    const data: {
                        exp: number
                        iat: number
                        user: {
                            id: string
                            email: string
                            username: string
                            slug: string
                        }
                    } = decoded

                    return {
                        decoded: data
                    }
                }
            }
        }
    })
    .mutation('login', {
        input: z.object({
            email: z.string(),
            password: z.string()
        }),
        async resolve({ input }) {
            const { email, password } = input

            const user = await User.findOne({ email })

            if (!user)
                return {
                    error: 'User does not exist'
                }

            if (user) {
                const isMatch = await bcrypt.compare(password, user.password)

                if (!isMatch)
                    return {
                        error: 'Incorrect password'
                    }

                const payload = {
                    user: {
                        id: user.id,
                        username: user.username,
                        slug: user.slug,
                        email: user.email
                    }
                }

                const token = jwt.sign(payload, config.jwtSecret, {
                    expiresIn: '7d'
                })

                if (token)
                    return {
                        token,
                        user: {
                            id: user.id,
                            username: user.username,
                            slug: user.slug,
                            email: user.email
                        }
                    }
                else
                    return {
                        error: 'There was an error with JWT'
                    }
            }
        }
    })
    .mutation('signup', {
        input: z.object({
            username: z.string(),
            slug: z.string(),
            email: z.string(),
            password: z.string()
        }),
        async resolve({ input }) {
            const { username, slug, email, password } = input

            const user = await User.findOne({ email })

            if (user)
                return {
                    error: 'User already exists'
                }

            let newUser = new User({
                username,
                slug,
                email,
                password
            })

            const salt = await bcrypt.genSalt(10)
            newUser.password = await bcrypt.hash(password, salt)
            await newUser.save()

            const payload = {
                user: {
                    id: newUser.id,
                    username,
                    slug,
                    email
                }
            }

            const token = jwt.sign(payload, config.jwtSecret, {
                expiresIn: '7d'
            })

            if (token)
                return {
                    token,
                    user: {
                        id: newUser.id,
                        username,
                        slug,
                        email
                    }
                }
            else
                return {
                    error: 'There was an error with JWT'
                }
        }
    })
