import { state } from '@pulsejs/core'

import { User } from '../config/types'

const user = state<User | null>(null)
const TOKEN = state<string | null>(null)

export default {
    user,
    TOKEN
}
