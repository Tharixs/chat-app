import { getRoomId } from '@/utils/getRoomId'
import firestore, {
    collection,
    FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore'
import React, { useCallback, useContext, useState } from 'react'
import { Alert } from 'react-native'

type RoomChatContextType = {
    messages: FirebaseFirestoreTypes.DocumentData[]
    loading: boolean
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
}

const RoomChatContext = React.createContext<RoomChatContextType | null>(null)
export const RoomChatProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [messages, setMessages] = useState<
        FirebaseFirestoreTypes.DocumentData[]
    >([])
    const createRoomChatIfNotExists = useCallback(
        async (userSenderId: string, userReceiverId: string) => {
            setLoading(true)
            const roomId = getRoomId(userSenderId, userReceiverId)
            try {
                await firestore().collection('rooms').doc(roomId).set({
                    id: roomId,
                    createdAt: firestore.FieldValue.serverTimestamp(),
                })
            } catch (error: any) {
                Alert.alert('Error creating room chat', error.message)
            } finally {
                setLoading(false)
            }
        },
        []
    )

    const sendMessage = useCallback(
        async (
            userSenderId: string,
            userReceiverId: string,
            message: string
        ) => {
            setLoading(true)
            try {
                const roomId = getRoomId(userSenderId, userReceiverId)
                const docRef = firestore().collection('rooms').doc(roomId)
                const messageRef = collection(docRef, 'messages')
                await messageRef.add({
                    userId: userSenderId,
                    text: message,
                    createdAt: firestore.FieldValue.serverTimestamp(),
                })
            } catch (error: any) {
                Alert.alert('Error sending message', error.message)
            } finally {
                setLoading(false)
            }
        },
        []
    )

    const getAllMessages = useCallback(
        (userSenderId: string, userReceiverId: string) => {
            const roomId = getRoomId(userSenderId, userReceiverId)
            const messageRef = firestore()
                .collection('rooms')
                .doc(roomId)
                .collection('messages')
                .orderBy('createdAt', 'asc')
            const unsubscribe = messageRef.onSnapshot((querySnapshot) => {
                const messages = querySnapshot.docs.map((doc) => doc.data())
                setMessages([...messages])
            })
            return unsubscribe
        },
        []
    )

    return (
        <RoomChatContext.Provider
            value={{
                messages,
                loading,
                createRoomChatIfNotExists,
                sendMessage,
                getAllMessages,
            }}
        >
            {children}
        </RoomChatContext.Provider>
    )
}

export const useRoomChat = () => {
    const value = useContext(RoomChatContext)
    if (!value) {
        throw new Error('useRoomChat must be used within an RoomChatProvider')
    }
    return value
}
