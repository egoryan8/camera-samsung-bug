import React from 'react'
import {YMInitializer} from 'react-yandex-metrika'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {ChakraProvider} from '@chakra-ui/react'

import './index.css'
import {extendTheme, type ThemeConfig} from '@chakra-ui/react'

// 2. Add your color mode config
const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

// 3. extend the theme
const theme = extendTheme({config})


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <YMInitializer accounts={[97176886]}/>
            <App/>
        </ChakraProvider>
    </React.StrictMode>,
)
