import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import AuthActionButton from '../../components/AuthActionButton'
import { AvoidingKeyboard } from '@/components/AvoidingKeyboard'
import AuthLoginForm from '../../components/AuthLoginForm'
import { Control, FormState } from 'react-hook-form'

type LoginViewTypeProps = {
    onSubmit: () => void
    formState: FormState<{
        [x: string]: any
    }>
    control: Control<
        {
            [x: string]: any
        },
        any
    >
}
const LoginView: React.FC<LoginViewTypeProps> = ({
    onSubmit,
    formState,
    control,
}) => {
    return (
        <AvoidingKeyboard className="flex-1 bg-white gap-12">
            <View
                style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}
                className="gap-12"
            >
                <View className="items-center">
                    <Image
                        style={{ height: hp(25) }}
                        resizeMode="contain"
                        source={require('@/assets/images/login.png')}
                    />
                </View>
                <View className="gap-10">
                    <Text
                        style={{ fontSize: hp(4) }}
                        className="font-bold tracking-wider text-center text-neutral-800"
                    >
                        Sign In
                    </Text>
                </View>
                <AuthLoginForm control={control} formState={formState} />
                <AuthActionButton formState={formState} onSubmit={onSubmit}>
                    <View className=" flex-row justify-center">
                        <Text
                            style={{ fontSize: hp(1.8) }}
                            className="font-semibold text-neutral-500"
                        >
                            Don't have an account?{' '}
                        </Text>
                        <Pressable onPress={() => router.push('/signUp')}>
                            <Text
                                style={{ fontSize: hp(1.8) }}
                                className="font-semibold text-rose-500"
                            >
                                Sign Up
                            </Text>
                        </Pressable>
                    </View>
                </AuthActionButton>
            </View>
        </AvoidingKeyboard>
    )
}

export default LoginView
