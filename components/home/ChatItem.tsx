import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { Image } from 'expo-image'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { blurHash } from '@/utils/common'
import { User } from '@/interfaces/user/user.interfaces'

export default function ChatItem({
    item,
    noBorder,
}: {
    item: User
    noBorder: boolean
}) {
    return (
        <TouchableOpacity
            onPress={() => {
                router.push({
                    pathname: '/chat',
                    params: { item: JSON.stringify(item ?? '{}') as any },
                })
            }}
            className={`flex-row justify-between mx-4 items-center pb-2 mb-2 gap-2 ${noBorder ? 'border-0' : 'border-b-[1px] border-neutral-300'}`}
        >
            <Image
                style={{ height: hp(6), width: hp(6), borderRadius: 100 }}
                source={item.imageUrl || 'https://i.pravatar.cc/1'}
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
