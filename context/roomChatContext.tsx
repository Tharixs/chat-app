import {
    createRoomChatIfNotExists,
    getAllMessages,
    getLastMessage,
    sendMessage,
} from '@/services/roomChatService'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import React, { useCallback, useState } from 'react'
import { Alert } from 'react-native'

type RoomChatContextType = {
    messages: FirebaseFirestoreTypes.DocumentData[]
    lastMessages: FirebaseFirestoreTypes.DocumentData | null
    loading: {
        createRoomChat: boolean
        sendMessage: boolean
        getMessages: boolean
    }
    createRoomChatIfNotExists: (
        userSenderId: string,
        userReceiverId: string
    ) => Promise<void>
    sendMessage: (
        userSenderId: string,
        userReceiverId: string,
        message: string
    ) => Promise<void>
    getAllMessages: (userSenderId: string, userReceiverId: string) => void
    getLastMessage: (
        userSenderId: string,
        userReceiverId: string
    ) => Promise<void>
}

const RoomChatContext = React.createContext<RoomChatContextType | null>(null)
export const RoomChatProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [loading, setLoading] = useState<{
        createRoomChat: boolean
        sendMessage: boolean
        getMessages: boolean
    }>({
        createRoomChat: false,
        sendMessage: false,
        getMessages: false,
    })
    const [messages, setMessages] = useState<
        FirebaseFirestoreTypes.DocumentData[]
    >([])

    const handleCreateRoomChat = useCallback(
        async (userSenderId: string, userReceiverId: string) => {
            setLoading((prev) => ({ ...prev, createRoomChat: true }))
            try {
                await createRoomChatIfNotExists(userSenderId, userReceiverId)
            } catch (error: any) {
                Alert.alert('Error sending message', error.message)
            } finally {
                setLoading((prev) => ({ ...prev, createRoomChat: false }))
            }
        },
        []
    )

    const handleSendMessage = async (
        userSenderId: string,
        userReceiverId: string,
        message: string
    ) => {
        setLoading((prev) => ({ ...prev, sendMessage: true }))
        try {
            await sendMessage(userSenderId, userReceiverId, message)
        } catch (error: any) {
            Alert.alert('Error sending message', error.message)
        } finally {
            setLoading((prev) => ({ ...prev, sendMessage: false }))
        }
    }

    const handleGetAllMessages = useCallback(
        (userSenderId: string, userReceiverId: string) => {
            return getAllMessages(userSenderId, userReceiverId, setMessages)
        },
        []
    )

    const handleGetLastMessages = useCallback(
        (userSenderId: string, userReceiverId: string) => {
            return getLastMessage(userSenderId, userReceiverId)
        },
        []
    )

    return (
        <RoomChatContext.Provider
            value={{
                messages,
                loading,
                createRoomChatIfNotExists: handleCreateRoomChat,
                sendMessage: handleSendMessage,
                getAllMessages: handleGetAllMessages,
                getLastMessage: handleGetLastMessages,
            }}
        >
            {children}
        </RoomChatContext.Provider>
    )
}

export default RoomChatContext
