import { View, Text, TextInput as Input } from 'react-native'
import React, { ReactElement } from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Control, FieldValues, useController } from 'react-hook-form'

const TextInput: React.FC<{
    icon?: ReactElement
    control?: Control<FieldValues>
    name?: string
    placeholder?: string
    scureTextEntry?: boolean
    errorMessage?: string
    value?: string
    label?: string
}> = (props) => {
    const { field } = useController({
        name: props.name ?? '',
        control: props.control,
        defaultValue: '',
    })

    return (
        <>
            {props.label && (
                <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-neutral-600"
                >
                    {props.label}
                </Text>
            )}
            <View
                style={{
                    height: hp(7),
                }}
                className="items-center flex-row bg-slate-100 px-4 rounded-xl"
            >
                {props.icon}
                <Input
                    {...props}
                    style={{ fontSize: hp(2) }}
                    className="flex-1 font-semibold text-neutral-700"
                    placeholder={props.placeholder ?? ''}
                    placeholderTextColor={'grey'}
                    onChangeText={field?.onChange}
                    secureTextEntry={props.scureTextEntry}
                    value={field?.value || props.value}
                />
            </View>
            {props.errorMessage && (
                <View className="px-4">
                    <Text
                        style={{ fontSize: hp(1.5), color: 'rgb(239 68 68)' }}
                        className="font-semibold tracking-wider"
                    >
                        {props.errorMessage}
                    </Text>
                </View>
            )}
        </>
    )
}

export default TextInput
