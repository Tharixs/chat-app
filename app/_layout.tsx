import { Slot, router, useSegments } from 'expo-router'
import { MenuProvider } from 'react-native-popup-menu'
import { AuthContextProvider, useAuth } from '@/context/authContext'
import { useEffect } from 'react'

import '../global.css'
const MainLayout = () => {
    const { isAuthenticated } = useAuth()
    const segments = useSegments()

    useEffect(() => {
        const inApp = segments[0] === '(app)'
        if (segments[0] === undefined) router.replace('signIn')
        if (isAuthenticated && !inApp) {
            router.replace('home')
        } else if (!isAuthenticated && inApp) {
            router.replace('signIn')
        }
    }, [isAuthenticated, segments])

    return (
        <Slot
            screenOptions={{ statusBarStyle: 'dark', statusBarColor: 'white' }}
        />
    )
}

export default function RootLayout() {
    return (
        <MenuProvider>
            <AuthContextProvider>
                <MainLayout />
            </AuthContextProvider>
        </MenuProvider>
    )
}
