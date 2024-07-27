import { Text, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useLocalSearchParams } from 'expo-router'
import { User } from '@/interfaces/user/user.interfaces'

export default function Chat() {
    const { item } = useLocalSearchParams()
    const userData: User = item && JSON.parse(item as string)
    return (
        <KeyboardAvoidingView className="flex-1 bg-white justify-center">
            <Text
                style={{ fontSize: hp(3) }}
                className="text-center font-bold text-neutral-800 capitalize"
            >
                Room Chat With {userData?.name}
            </Text>
        </KeyboardAvoidingView>
    )
}
