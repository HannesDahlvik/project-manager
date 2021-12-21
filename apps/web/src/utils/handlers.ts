import { useNotifications } from '@mantine/notifications'

const useInfoHandler = () => {
    const notification = useNotifications()

    const show = (msg: string) => {
        notification.showNotification({
            title: 'INFO',
            message: msg,
            color: 'blue'
        })
    }
    return show
}

const useErrorHandler = () => {
    const notification = useNotifications()

    const show = (msg: string, err?: any) => {
        if (err) console.error(err)

        notification.showNotification({
            title: 'ERROR',
            message: msg,
            color: 'red'
        })
    }
    return show
}

export { useInfoHandler, useErrorHandler }
