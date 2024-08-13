import { View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

export default function LotieAnimationIcon({
    size,
    source,
}: {
    size: any
    source: any
}) {
    return (
        <View style={{ height: size, aspectRatio: 1 }}>
            <LottieView style={{ flex: 1 }} source={source} autoPlay loop />
        </View>
    )
}
