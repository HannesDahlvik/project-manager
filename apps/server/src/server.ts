import express from 'express'
import * as trpc from '@trpc/server'

// Middleware
import cors from 'cors'
import * as trpcExpress from '@trpc/server/adapters/express'
import logger from './utils/logger'

// Routes
import { apiRoute } from './routes/api'
import { authRoute } from './routes/auth'

// Utils
import database from './config/database'

// TRPC Setup
const appRouter = trpc.router().merge('api.', apiRoute).merge('auth.', authRoute)
export type AppRouter = typeof appRouter

// Express Setup
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)

/**
 * Express Routes
 */
app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext: () => null
    })
)

/**
 * Database connection & server start
 */
database()
    .then(() => {
        logger('server', 'Connected to mongo database')
        app.listen(PORT, () => logger('server', `Server is running on port ${PORT}`))
    })
    .catch((err) => logger('error', err))
