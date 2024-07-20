import { Slot, router, useSegments } from 'expo-router'

import { AuthContextProvider, useAuth } from '@/context/authContext'
import { useEffect } from 'react'

import '../global.css'
const MainLayout = () => {
    const { isAuthenticated } = useAuth()
    const segments = useSegments()

    useEffect(() => {
        const inApp = segments[0] === '(app)'
        if (isAuthenticated && !inApp) {
            router.replace('home')
        }
        if (!isAuthenticated) {
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
        <AuthContextProvider>
            <MainLayout />
        </AuthContextProvider>
    )
}
