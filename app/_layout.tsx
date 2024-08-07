import { Slot, router, useSegments } from 'expo-router'
import { MenuProvider } from 'react-native-popup-menu'
import { AuthContextProvider, useAuthContext } from '@/context/authContext'
import React, { useEffect } from 'react'

import '../global.css'
import { RoomChatProvider } from '@/context/roomChatContext'
import { storage } from '@/services/localStorageService'
const MainLayout = () => {
    const segments = useSegments()
    const { isAuthenticated } = useAuthContext()
    const authenticated =
        isAuthenticated || storage.getBoolean('isAuthenticated')

    useEffect(() => {
        const inApp = segments[0] === '(app)'
        if (segments[0] === undefined) router.replace('signIn')
        if (authenticated && !inApp) {
            router.replace('home')
        } else if (!authenticated && inApp) {
            router.replace('signIn')
        }
    }, [authenticated, segments])

    return <Slot />
}

export default function RootLayout() {
    return (
        <MenuProvider>
            <AuthContextProvider>
                <RoomChatProvider>
                    <MainLayout />
                </RoomChatProvider>
            </AuthContextProvider>
        </MenuProvider>
    )
}
