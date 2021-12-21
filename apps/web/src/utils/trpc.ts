import type { AppRouter } from '../../../server/src/server'
import { createReactQueryHooks } from '@trpc/react'

export const trpc = createReactQueryHooks<AppRouter>()

export type { AppRouter }
