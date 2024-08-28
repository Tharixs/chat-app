import { View, Text, TextInput as Input, TouchableOpacity } from 'react-native'
import React, { ReactElement } from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Control, FieldValues, useController } from 'react-hook-form'

const TextInput: React.FC<
    {
        icon?: ReactElement
        positionIcon?: 'left' | 'right'
        control: Control<FieldValues>
        name?: string
        errorMessage?: string
        value?: string
        label?: string
    } & React.ComponentProps<typeof Input>
> = ({ positionIcon = 'left', editable = true, ...props }) => {
    const { field } = useController({
        name: props.name ?? '',
        control: props.control,
        defaultValue: props?.value ?? '',
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
                <TouchableOpacity>
                    {positionIcon === 'left' && props.icon && props.icon}
                </TouchableOpacity>
                <Input
                    {...props}
                    style={[{ fontSize: hp(2) }, props.style]}
                    className={`flex-1 font-semibold ${editable ? 'text-neutral-700' : 'text-neutral-400'}`}
                    placeholderTextColor={'grey'}
                    onChangeText={field?.onChange}
                    editable={editable}
                    value={field?.value}
                />
                <TouchableOpacity>
                    {positionIcon === 'right' && props.icon && props.icon}
                </TouchableOpacity>
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
