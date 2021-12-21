import { User } from '../config/types'
import core from '../logic/core'

/**
 *
 * @param token The JWT token
 * @param user The user object
 */
const setAuth = (token: string, user: User) => {
    core.state.TOKEN.set(token)
    core.state.user.set(user)
    localStorage.setItem('token', token)
}

/**
 * Signout the user
 */
const logout = () => {
    core.state.TOKEN.set('')
    core.state.user.set(null)
    localStorage.removeItem('token')
}

export { setAuth, logout }
