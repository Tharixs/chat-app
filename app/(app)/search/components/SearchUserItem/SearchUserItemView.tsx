import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { blurHash } from '@/utils/common'
import Button from '@/components/Button'

type SearchUserListTypeProps = {
    item: User
    noBorder: boolean
    isUser: boolean
    isFollowing: boolean
    handleNavigate: () => void
    handleActionFollow: () => void
    handleNameOfFollower: string
}

const SearchUserItemView: React.FC<SearchUserListTypeProps> = ({
    item,
    noBorder,
    isUser,
    isFollowing,
    handleNavigate,
    handleActionFollow,
    handleNameOfFollower,
}) => (
    <TouchableOpacity
        onPress={handleNavigate}
        className={`flex-row justify-between mx-4 items-center pb-2 mb-2 gap-2 ${noBorder ? 'border-0' : 'border-b-[1px] border-neutral-300'}`}
    >
        <Image
            style={{ height: hp(6), width: hp(6), borderRadius: 100 }}
            source={item.imageUrl || require('@/assets/images/avatar.png')}
            placeholder={blurHash}
            transition={500}
        />
        <View className="flex-1 gap-1">
            <Text
                style={{ fontSize: hp(1.8) }}
                className="font-semibold text-neutral-800"
            >
                {item.userName}
            </Text>
            <Text
                style={{ fontSize: hp(1.8) }}
                className="font-medium text-neutral-500"
            >
                {handleNameOfFollower}
            </Text>
        </View>
        {!isUser && (
            <Button
                label={isFollowing ? 'Unfollow' : 'Follow'}
                className="justify-center"
                onPress={handleActionFollow}
            />
        )}
    </TouchableOpacity>
)
export default SearchUserItemView
