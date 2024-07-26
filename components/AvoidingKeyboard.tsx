import { Platform, KeyboardAvoidingView, ScrollView } from 'react-native'
import React from 'react'

const ios = Platform.OS === 'ios'

type AvoidingKeyboardType = React.PropsWithChildren<
    React.ComponentProps<typeof KeyboardAvoidingView>
>
export const AvoidingKeyboard: React.FC<AvoidingKeyboardType> = ({
    children,
    ...props
}) => {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={ios ? 'padding' : 'height'}
            {...props}
        >
            <ScrollView
                style={{ flex: 1 }}
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
