import colors from 'colors'

const logger = (type: 'server' | 'error' | 'ws', msg: string | any) => {
    if (type === 'server') console.log(`${colors.cyan('[server]')} ${msg}`)
    if (type === 'error') console.error(`${colors.cyan('[server]')} ${msg}`)
    if (type === 'ws') console.log(`[ws] ${msg}`)
}

export default logger
