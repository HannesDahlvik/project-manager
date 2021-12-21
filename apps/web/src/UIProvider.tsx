import React, { useEffect } from 'react'

// UI
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { IconContext } from 'phosphor-react'
import { useLocalStorageValue } from '@mantine/hooks'
import { NotificationsProvider } from '@mantine/notifications'

const UIProvider: React.FC = (props) => {
    const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
        key: 'theme',
        defaultValue: 'light'
    })

    const toggleColorScheme = () => {
        setColorScheme((current) => {
            const newColorScheme = colorScheme === 'dark' ? 'light' : 'dark'
            document.body.classList.remove(current)
            document.body.classList.add(newColorScheme)
            return newColorScheme
        })
    }

    useEffect(() => {
        document.body.classList.add(colorScheme)
    }, [])

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{ colorScheme, dateFormat: 'DD/MM/YYYY' }}>
                <NotificationsProvider>
                    <IconContext.Provider
                        value={{
                            weight: 'fill'
                        }}
                    >
                        {props.children}
                    </IconContext.Provider>
                </NotificationsProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    )
}

export default UIProvider
