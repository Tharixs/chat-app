import { Image } from 'expo-image'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { blurHash } from '@/utils/common'

type ChatItemTypeProps = {
    item: User
    noBorder: boolean
    handleChatPress: () => void
    lastTime: string
    lastMessage: string
}
const HomeChatItemView: React.FC<ChatItemTypeProps> = ({
    item,
    noBorder,
    handleChatPress,
    lastTime,
    lastMessage,
}) => {
    return (
        <TouchableOpacity
            onPress={handleChatPress}
            className={`flex-row justify-between mx-4 items-center pb-2 mb-2 gap-2 ${noBorder ? 'border-0' : 'border-b-[1px] border-neutral-300'}`}
        >
            <Image
                style={{ height: hp(6), width: hp(6), borderRadius: 100 }}
                source={item?.imageUrl || require('@/assets/images/avatar.png')}
                placeholder={blurHash}
                transition={800}
            />
            <View className="flex-1 gap-1">
                <View className=" flex-row items-center justify-between">
                    <Text
                        style={{ fontSize: hp(1.8) }}
                        className="font-semibold text-neutral-800"
                    >
                        {item?.userName}
                    </Text>
                    <Text
                        style={{ fontSize: hp(1.6) }}
                        className="font-medium text-neutral-500"
                    >
                        {lastTime}
                    </Text>
                </View>
                <Text
                    style={{ fontSize: hp(1.8) }}
                    className="font-medium text-neutral-500"
                >
                    {lastMessage}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default HomeChatItemView
