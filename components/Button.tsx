import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

type ButtonProps = {
    label?: string
    mode?: 'outline' | 'contained'
}
const Button: React.FC<
    React.ComponentProps<typeof TouchableOpacity> & ButtonProps
> = (props) => {
    return (
        <TouchableOpacity
            style={{ height: hp(6.5) }}
            className={
                `items-center ${props.mode === 'contained' ? 'bg-rose-600' : 'border-2 border-rose-600'}  justify-center rounded-xl` +
                (props.className ? ` ${props.className} ` : '')
            }
            {...props}
        >
            <Text
                style={{ fontSize: hp(2) }}
                className={`${props.mode === 'contained' ? 'text-white' : 'text-rose-600'} font-semibold tracking-wider text-center`}
            >
                {props.label}
            </Text>
        </TouchableOpacity>
    )
}

export default Button
