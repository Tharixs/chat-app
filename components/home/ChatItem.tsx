import { Image } from 'expo-image'
import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { blurHash } from '@/utils/common'
import throttle from '@/utils/throttle'

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
                        Time
                    </Text>
                </View>
                <Text
                    style={{ fontSize: hp(1.8) }}
                    className="font-medium text-neutral-500"
                >
                    Last Message
                </Text>
            </View>
        </TouchableOpacity>
    )
}
