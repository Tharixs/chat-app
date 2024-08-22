import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { router } from 'expo-router'
import { AvoidingKeyboard } from '@/components/AvoidingKeyboard'
import AuthActionButton from '../../components/AuthActionButton'
import { Control, FormState } from 'react-hook-form'
import AuthRegisterForm from '../../components/AuthRegisterForm'
type RegisterViewTypeProps = {
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
const RegisterView: React.FC<RegisterViewTypeProps> = ({
    formState,
    onSubmit,
    control,
}) => {
    return (
        <AvoidingKeyboard className="flex-1 bg-white">
            <View
                style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}
                className="gap-12"
            >
                <View className="items-center">
                    <Image
                        style={{ height: hp(20) }}
                        resizeMode="contain"
                        source={require('@/assets/images/register.png')}
                    />
                </View>
                <View className="gap-10">
                    <Text
                        style={{ fontSize: hp(4) }}
                        className="font-bold tracking-wider text-center text-neutral-800"
                    >
                        Sign Up
                    </Text>
                </View>
                {/* Text Input */}
                <AuthRegisterForm formState={formState} control={control} />
                <AuthActionButton formState={formState} onSubmit={onSubmit}>
                    <View className=" flex-row justify-center">
                        <Text
                            style={{ fontSize: hp(1.8) }}
                            className="font-semibold text-neutral-500"
                        >
                            Already have an account?{' '}
                        </Text>
                        <Pressable onPress={() => router.push('/signIn')}>
                            <Text
                                style={{ fontSize: hp(1.8) }}
                                className="font-semibold text-rose-500"
                            >
                                Sign In
                            </Text>
                        </Pressable>
                    </View>
                </AuthActionButton>
            </View>
        </AvoidingKeyboard>
    )
}
export default RegisterView
