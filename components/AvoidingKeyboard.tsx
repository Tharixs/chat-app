import { Platform, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { ReactNode } from 'react'

const ios = Platform.OS === 'ios'
export const AvoidingKeyboard: React.FC<{ children?: ReactNode }> = ({
    children,
}) => {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={ios ? 'padding' : 'height'}
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
