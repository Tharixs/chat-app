import LotieAnimationIcon from '@/components/LotieAnimationIcon'
import React from 'react'
import { View } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default function StartPage() {
    return (
        <View className="flex-1 items-center justify-center">
            <LotieAnimationIcon
                size={hp(15)}
                source={require('../assets/images/loading.json')}
            />
        </View>
    )
}
