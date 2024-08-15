import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { forgotPasswordSchema } from '@/schemas/auth/forgotPassword.schema'
import { AvoidingKeyboard } from '@/components/AvoidingKeyboard'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import { Ionicons } from '@expo/vector-icons'
import TextInput from '@/components/TextInput'
import Button from '@/components/Button'
import { Link, router } from 'expo-router'
import { forgotPassword } from '@/services/authService'
import { ModalStatus } from '@/components/modal/StatusModal'

export default function ForgotPassword() {
    const [error, setError] = useState<string | null>(null)
    const [isError, setIsError] = useState(false)
    const [isSucces, setIsSuccess] = useState(false)
    const [success, setSuccess] = useState<string | null>(null)
    const { control, formState, handleSubmit, getValues, reset } = useForm({
        resolver: yupResolver(forgotPasswordSchema),
        delayError: 300,
    })

    const onSubmit: SubmitHandler<Partial<SignIn>> = async (data) => {
        try {
            forgotPassword(data.email!)
            setIsError(false)
            setIsSuccess(true)
            setSuccess('Check your email to reset your password')
            reset()
        } catch (err) {
            console.error('Error login', err)
            setIsError(true)
            setIsSuccess(false)
            setError((err as Error).message)
        }
    }
    return (
        <AvoidingKeyboard className="flex-1 bg-white gap-12">
            <ModalStatus
                isVisible={isError}
                status="fail"
                title="Send email failed !"
                message={error || 'Something went wrong'}
                onClose={() => setIsError(false)}
            />
            <ModalStatus
                isVisible={isSucces}
                status="success"
                title="Email sent successfully"
                message={success || 'Check your email to reset your password'}
                onClose={() => setIsSuccess(false)}
            />
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
                            onPress={() =>
                                handleSubmit(() =>
                                    onSubmit(getValues() as Partial<SignIn>)
                                )()
                            }
                        />
                        <Button
                            label="Back to Sign In"
                            mode="outline"
                            onPress={() => router.push('signIn')}
                        />
                    </View>
                    <View className=" flex-row justify-center">
                        <Text
                            style={{ fontSize: hp(1.8) }}
                            className="font-semibold text-neutral-500"
                        >
                            Don't have an account?{' '}
                        </Text>
                        <Link href={'/signUp'} asChild>
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
