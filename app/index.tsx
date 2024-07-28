import Loading from '@/components/Loading'
import React from 'react'
import { View } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default function StartPage() {
    return (
        <View className="flex-1 items-center justify-center">
            <Loading size={hp(15)} />
        </View>
    )
}
