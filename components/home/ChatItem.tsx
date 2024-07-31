import { Image } from 'expo-image'
import { router } from 'expo-router'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { blurHash } from '@/utils/common'
import throttle from '@/utils/throttle'
import auth from '@react-native-firebase/auth'
import { useRoomChat } from '@/hooks/useRoomChat'
export default function ChatItem({
    item,
    noBorder,
}: {
    item: User
    noBorder: boolean
}) {
    const handleChatPress = throttle(() => {
        router.push({
            pathname: '/chat',
            params: { item: JSON.stringify(item ?? '{}') as any },
        })
    }, 1000)

    const { getLastMessage, lastMessages } = useRoomChat()
    const [lastMessagesData, setLastMessageData] = useState<any>()
    const userId = auth()?.currentUser?.uid
    useEffect(() => {
        if (!userId || !item) return
        const fetchLastMessage = async () => {
            const message = await getLastMessage(userId, item.id)
            setLastMessageData(message)
        }
        fetchLastMessage()
    }, [getLastMessage, item, userId])

    const handleLastMessage = () => {
        if (typeof lastMessagesData === 'undefined') return 'loading...'
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
                        {item.name}
                    </Text>
                    <Text
                        style={{ fontSize: hp(1.6) }}
                        className="font-medium text-neutral-500"
                    >
                        {new Date(
                            (lastMessages?.createdAt as User['createdAt'])
                                ?.seconds * 1000
                        ).toLocaleString()}
                    </Text>
                </View>
                <Text
                    style={{ fontSize: hp(1.8) }}
                    className="font-medium text-neutral-500"
                >
                    {handleLastMessage()}
                </Text>
            </View>
        </TouchableOpacity>
    )
}
