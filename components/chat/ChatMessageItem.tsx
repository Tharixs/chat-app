import { View, Text } from 'react-native'
import React from 'react'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

export const ChatMessageItem: React.FC<{
    message: string
    isSender: boolean
}> = ({ isSender = false, ...props }) => {
    if (isSender) {
        return (
            <View className="mb-4">
                <View
                    style={{ maxWidth: wp(80) }}
                    className="flex self-end rounded-2xl bg-neutral-100 p-3 px-3"
                >
                    <Text
                        style={{ fontSize: hp(1.9) }}
                        className="text-neutral-500 font-medium"
                    >
                        {props.message}
                    </Text>
                </View>
            </View>
        )
    } else {
        return (
            <View className="mb-4">
                <View
                    style={{ maxWidth: wp(80) }}
                    className="flex self-start rounded-2xl bg-rose-600 p-3 px-4"
                >
                    <Text
                        style={{ fontSize: hp(1.9) }}
                        className="text-white font-medium"
                    >
                        {props.message}
                    </Text>
                </View>
            </View>
        )
    }
}
