import { createRouter } from '../utils/createRouter'
import { z } from 'zod'

export const apiRoute = createRouter()
    .query('hello', {
        input: z
            .object({
                text: z.string()
            })
            .nullish(),
        resolve({ input }) {
            return {
                text: `Hello ${input?.text ?? 'world'}`
            }
        }
    })
    .query('test', {
        resolve() {
            return {
                text: 'test'
            }
        }
    })
