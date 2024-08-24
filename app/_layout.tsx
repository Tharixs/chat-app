import { Slot, router, useSegments } from 'expo-router'
import { MenuProvider } from 'react-native-popup-menu'
import { AuthContextProvider, useAuthContext } from '@/context/authContext'
import React, { useEffect } from 'react'
import * as Notifications from 'expo-notifications'

import '../global.css'
import { RoomChatProvider } from '@/context/roomChatContext'
import { NotificationProvider } from '@/context/notificationContext'
import {
    ModalContextProvider,
    useModalActionContext,
    useModalStateContext,
} from '@/context/modalContext'
import { ModalStatus } from '@/components/StatusModal'
if (__DEV__) require('../ReactotronConfig')

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
})

const MainLayout = () => {
    const segments = useSegments()
    const { isAuthenticated } = useAuthContext()
    const { isVisible, typeModal, body, title } = useModalStateContext()
    const { closeModal } = useModalActionContext()

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
        <>
            <ModalStatus
                isVisible={isVisible}
                status={typeModal as 'success' | 'fail'}
                title={title}
                message={body}
                onClose={() => {
                    closeModal()
                }}
            />
            <Slot />
        </>
    )
}

export default function RootLayout() {
    return (
        <MenuProvider>
            <AuthContextProvider>
                <RoomChatProvider>
                    <NotificationProvider>
                        <ModalContextProvider>
                            <MainLayout />
                        </ModalContextProvider>
                    </NotificationProvider>
                </RoomChatProvider>
            </AuthContextProvider>
        </MenuProvider>
    )
}
