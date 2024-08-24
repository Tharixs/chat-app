import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import throttle from '@/utils/throttle'
import auth from '@react-native-firebase/auth'
import { useRoomChatContext } from '@/context/roomChatContext'
import { useChatHook } from '@/hooks/useChat'
import ChatItemView from './HomeChatItemView'
const HomeChatItem = ({
    item,
    noBorder,
}: {
    item: User
    noBorder: boolean
}) => {
    const { getLastMessage } = useRoomChatContext()
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
        const unsubscribe = getLastMessage(userId, item?.id).onSnapshot(
            (querySnapshot) => {
                const lastMessage = querySnapshot.docs[0]?.data?.()
                setLastMessageData(lastMessage)
            }
        )
        return unsubscribe
    }, [getLastMessage, item, userId])

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
