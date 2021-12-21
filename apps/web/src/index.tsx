import React from 'react'
import ReactDOM from 'react-dom'
import './assets/styles/index.scss'

import App from './App'

// Routing
import { BrowserRouter } from 'react-router-dom'

// UI
import UIProvider from './UIProvider'

ReactDOM.render(
    <>
        <BrowserRouter>
            <UIProvider>
                <App />
            </UIProvider>
        </BrowserRouter>
    </>,
    document.getElementById('root')
)
