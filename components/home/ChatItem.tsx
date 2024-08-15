import { Image } from 'expo-image'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { blurHash } from '@/utils/common'
import throttle from '@/utils/throttle'
import auth from '@react-native-firebase/auth'
import { useRoomChatContext } from '@/context/roomChatContext'
import { useChatHook } from '@/hooks/useChat'
export default function ChatItem({
    item,
    noBorder,
}: {
    item: User
    noBorder: boolean
}) {
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

    const handleDisplayLastMessage = () => {
        if (lastMessagesData) {
            if (userId === lastMessagesData?.userId)
                return 'You : ' + lastMessagesData?.text
            return lastMessagesData?.text
        } else {
            return 'Say Hayy :)'
        }
    }

    return (
        <TouchableOpacity
            onPress={handleChatPress}
            className={`flex-row justify-between mx-4 items-center pb-2 mb-2 gap-2 ${noBorder ? 'border-0' : 'border-b-[1px] border-neutral-300'}`}
        >
            <Image
                style={{ height: hp(6), width: hp(6), borderRadius: 100 }}
                source={item.imageUrl || require('@/assets/images/avatar.png')}
                placeholder={blurHash}
                transition={800}
            />
            <View className="flex-1 gap-1">
                <View className=" flex-row items-center justify-between">
                    <Text
                        style={{ fontSize: hp(1.8) }}
                        className="font-semibold text-neutral-800"
                    >
                        {item.userName}
                    </Text>
                    <Text
                        style={{ fontSize: hp(1.6) }}
                        className="font-medium text-neutral-500"
                    >
                        {handleDisplayLastDateTime(
                            lastMessagesData?.createdAt?.seconds &&
                                new Date(
                                    lastMessagesData?.createdAt?.seconds * 1000
                                )
                        )}
                    </Text>
                </View>
                <Text
                    style={{ fontSize: hp(1.8) }}
                    className="font-medium text-neutral-500"
                >
                    {handleDisplayLastMessage()}
                </Text>
            </View>
        </TouchableOpacity>
    )
}
