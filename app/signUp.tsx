import Loading from '@/components/Loading'
import TextInput from '@/components/TextInput'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    Alert,
    Image,
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { signUpSchema } from '@/schemas/auth/signUp.schema'
import { AvoidingKeyboard } from '@/components/AvoidingKeyboard'
import { useAuthContext } from '@/context/authContext'
import Button from '@/components/Button'

export default function SignUp() {
    const [loading, setLoading] = useState(false)
    const { handleRegister } = useAuthContext()
    const { control, formState, handleSubmit, getValues } = useForm({
        resolver: yupResolver(signUpSchema),
        delayError: 300,
    })
    const onSubmit: SubmitHandler<SignUp> = async (data) => {
        try {
            setLoading(true)
            await handleRegister(data.email, data.password, data.userName)
        } catch (err: any) {
            Alert.alert('Error register', `${(err as Error).message}`, [
                { text: 'Sign In', onPress: () => router.back() },
                { text: 'Cancel', onPress: () => {} },
            ])
        } finally {
            setLoading(false)
        }
    }

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
                        source={require('../assets/images/register.png')}
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
                <View className="gap-4">
                    <TextInput
                        icon={
                            <Ionicons
                                name="person-outline"
                                size={hp(3.5)}
                                color={'rgb(115 115 115)'}
                                style={{ marginRight: wp(2) }}
                            />
                        }
                        control={control}
                        name="userName"
                        placeholder="User Name"
                        errorMessage={String(
                            formState.errors.userName?.message ?? ''
                        )}
                    />
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
                <View className="gap-4">
                    <View>
                        {loading ? (
                            <View className="justify-center items-center">
                                <Loading size={hp(15.5)} />
                            </View>
                        ) : (
                            <Button
                                mode="contained"
                                label="Sign Up"
                                onPress={() =>
                                    handleSubmit(() =>
                                        onSubmit(getValues() as SignUp)
                                    )()
                                }
                            />
                        )}
                    </View>
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
                </View>
            </View>
        </AvoidingKeyboard>
    )
}
