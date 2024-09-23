import { View, Text } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import Button from '@/components/Button'
import { Ionicons } from '@expo/vector-icons'
import TextInput from '@/components/TextInput'
import { AvoidingKeyboard } from '@/components/AvoidingKeyboard'
type ForgotPasswordViewTypePops = {
    onSubmit: () => void
    control: any
    formState: any
}
const ForgotPasswordView: React.FC<ForgotPasswordViewTypePops> = ({
    onSubmit,
    control,
    formState,
}) => {
    return (
        <AvoidingKeyboard className="flex-1 bg-white gap-12">
            <View
                style={{
                    paddingHorizontal: wp(5),
                    marginVertical: hp('25%'),
                }}
                className="gap-4"
            >
                <View className="gap-4">
                    <Text
                        style={{ fontSize: hp(4) }}
                        className="font-bold tracking-wider text-center text-neutral-800"
                    >
                        Forgot Password
                    </Text>
                    <Text
                        style={{ fontSize: hp(2.3) }}
                        className="font-medium tracking-wider text-center text-neutral-400"
                    >
                        No need to worry. Enter your email and we will send you
                    </Text>
                </View>
                <View style={{ marginTop: hp(5) }} className="gap-4">
                    <TextInput
                        icon={
                            <Ionicons
                                name="mail-outline"
                                size={hp(3.5)}
                                color={'rgb(115 115 115)'}
                                style={{ marginRight: wp(2) }}
                            />
                        }
                        control={control}
                        name="email"
                        placeholder="Email Address"
                        errorMessage={String(
                            formState.errors.email?.message ?? ''
                        )}
                    />
                    <View className="gap-4 mt-4">
                        <Button
                            label="Reset Password"
                            mode="contained"
                            onPress={onSubmit}
                        />
                        <Button
                            label="Back to Sign In"
                            mode="outline"
                            onPress={() => router.push('register')}
                        />
                    </View>
                    <View className=" flex-row justify-center">
                        <Text
                            style={{ fontSize: hp(1.8) }}
                            className="font-semibold text-neutral-500"
                        >
                            Don't have an account?{' '}
                        </Text>
                        <Link href={'/register'} asChild>
                            <Text
                                style={{ fontSize: hp(1.8) }}
                                className="font-semibold text-rose-500"
                            >
                                Sign Up
                            </Text>
                        </Link>
                    </View>
                </View>
            </View>
        </AvoidingKeyboard>
    )
}

export default ForgotPasswordView
