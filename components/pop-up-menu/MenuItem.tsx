import { View, Text } from 'react-native'
import React from 'react'
import { MenuOption } from 'react-native-popup-menu'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

type Props = {
    onClick: () => void
    text: string
    value: string | null
    icon: React.ReactNode
}

const MenuItem: React.FC<Props> = ({ onClick, text, value, icon }) => {
    return (
        <MenuOption
            value={value}
            onSelect={onClick}
            customStyles={{ optionWrapper: { flex: 1 } }}
        >
            <View className="px-4 py-1 flex-row items-center justify-between">
                <Text
                    style={{ fontSize: hp(1.7) }}
                    className="font-semibold text-neutral-600"
                >
                    {text}
                </Text>
                {icon}
            </View>
        </MenuOption>
    )
}

export default MenuItem
