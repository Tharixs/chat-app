import TextInput from '@/components/TextInput'
import { signInSchema } from '@/schemas/auth/signIn.schema'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Image, Pressable, Text, View } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { Ionicons } from '@expo/vector-icons'
import { Link, router } from 'expo-router'
import { AvoidingKeyboard } from '@/components/AvoidingKeyboard'
import { useAuthContext } from '@/context/authContext'
import Button from '@/components/Button'
import LotieAnimationIcon from '@/components/LotieAnimationIcon'
import { ModalStatus } from '@/components/modal/StatusModal'
import { storeFCMToken } from '@/services/fcmService'
import { useNotificationContext } from '@/context/notificationContext'

import auth from '@react-native-firebase/auth'

export default function SignIn() {
    const { handleLogin } = useAuthContext()
    const [loading, setLoading] = useState(false)
    const [isLoginError, setIsLoginError] = useState(false)
    const [isLoginSuccess, setIsLoginSuccess] = useState(false)
    const [errorLogin, setErrorLogin] = useState('')
    const { control, formState, handleSubmit, getValues } = useForm({
        resolver: yupResolver(signInSchema),
        delayError: 300,
    })
    const { expoPushToken } = useNotificationContext()
    const onSubmit: SubmitHandler<SignIn> = async (data) => {
        setLoading(true)
        try {
            await handleLogin(data.email, data.password)
            await storeFCMToken(expoPushToken, auth()?.currentUser?.uid!)
            setIsLoginSuccess(true)
            setIsLoginError(false)
        } catch (err) {
            console.error('Error login', err)
            setIsLoginError(true)
            setIsLoginSuccess(false)
            setErrorLogin((err as Error).message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AvoidingKeyboard className="flex-1 bg-white gap-12">
            <ModalStatus
                isVisible={isLoginError}
                status="fail"
                title="Login failed !"
                message={errorLogin}
                onClose={() => setIsLoginError(false)}
            />
            <ModalStatus
                isVisible={isLoginSuccess}
                status="success"
                title="Login Success !"
                message={'lets get started'}
                onClose={() => setIsLoginSuccess(false)}
            />
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
                {/* Text Input */}
                <View className="gap-4">
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
                    <View className="gap-3">
                        <TextInput
                            icon={
                                <Ionicons
                                    name="lock-closed-outline"
                                    size={hp(3.5)}
                                    color={'rgb(115 115 115)'}
                                    style={{ marginRight: wp(2) }}
                                />
                            }
                            control={control}
                            name="password"
                            placeholder="Password"
                            secureTextEntry={true}
                            errorMessage={String(
                                formState.errors.password?.message ?? ''
                            )}
                        />
                    </View>
                    <Link href={'/forgotPassword'} asChild>
                        <Text
                            style={{ fontSize: hp(1.8) }}
                            className="font-semibold text-right text-neutral-500"
                        >
                            Forgot Password?
                        </Text>
                    </Link>
                </View>
                <View className="gap-4">
                    <View>
                        {loading ? (
                            <View className="justify-center items-center">
                                <LotieAnimationIcon
                                    size={hp(15.5)}
                                    source={require('../assets/images/loading.json')}
                                />
                            </View>
                        ) : (
                            <Button
                                mode="contained"
                                label="Sign In"
                                onPress={() => {
                                    handleSubmit(() =>
                                        onSubmit(getValues() as SignIn)
                                    )()
                                }}
                            />
                        )}
                    </View>
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
                </View>
            </View>
        </AvoidingKeyboard>
    )
}
