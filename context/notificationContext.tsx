import { useNotification } from '@/hooks/useNotification'
import React, { createContext, useContext } from 'react'

import * as Notifications from 'expo-notifications'

type NotificationContextType = {
    registerForPushNotificationsAsync: () => Promise<string | undefined>
    sendPushNotification: (
        expoPushToken: string,
        title: string,
        body: string
    ) => Promise<void>
    expoPushToken: string
    notification: Notifications.Notification | undefined
}

const NotificationContext = createContext<NotificationContextType | undefined>(
    undefined
)

export const NotificationProvider = ({ children }: any) => {
    const notification = useNotification()

    return (
        <NotificationContext.Provider value={notification}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotificationContext = (): NotificationContextType => {
    const context = useContext(NotificationContext)
    if (context === undefined) {
        throw new Error(
            'useNotification must be used within a NotificationContextProvider'
        )
    }
    return context
}
