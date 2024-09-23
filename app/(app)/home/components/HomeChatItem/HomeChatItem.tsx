import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import throttle from '@/utils/throttle'
import auth from '@react-native-firebase/auth'
import { useChatHook } from '@/hooks/useChat'
import ChatItemView from './HomeChatItemView'
import { getLastMessage } from '@/services/roomChatService'
const HomeChatItem = ({
    item,
    noBorder,
    onUpdateLastMessage,
}: {
    item: User
    noBorder: boolean
    onUpdateLastMessage: (userChatId: string, lastMessage: Message) => void
}) => {
    const [lastMessagesData, setLastMessageData] = useState<any>()
    const { handleDisplayLastDateTime } = useChatHook()
    const userId = auth()?.currentUser?.uid

    const handleChatPress = throttle(() => {
        router.push({
            pathname: '/chat',
            params: { item: JSON.stringify(item ?? '{}') as any },
        })
    }, 1000)

    useEffect(() => {
        if (!userId || !item) return
        const unsubscribe = getLastMessage(userId, item.id).onSnapshot(
            (querySnapshot) => {
                const lastMessage = querySnapshot.docs[0]?.data()
                if (lastMessage) {
                    setLastMessageData(lastMessage)
                    onUpdateLastMessage(item.id, lastMessage as Message) // Memanggil fungsi update
                } else {
                    console.log('No last message found for user:', item.id) // Log jika tidak ada pesan
                }
            }
        )
        return unsubscribe
    }, [item, userId, onUpdateLastMessage])

    const handleDisplayLastMessage = (): string => {
        if (lastMessagesData) {
            if (userId === lastMessagesData?.userId)
                return 'You : ' + lastMessagesData?.text
            return lastMessagesData?.text
        } else {
            return 'Say Hayy :)'
        }
    }

    return (
        <ChatItemView
            noBorder={noBorder}
            item={item}
            handleChatPress={handleChatPress}
            lastMessage={handleDisplayLastMessage()}
            lastTime={handleDisplayLastDateTime(
                lastMessagesData?.createdAt?.seconds &&
                    new Date(lastMessagesData?.createdAt?.seconds * 1000)
            )}
        />
    )
}

export default HomeChatItem
