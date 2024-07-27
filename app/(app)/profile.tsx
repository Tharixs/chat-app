import { Alert, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Image } from 'expo-image'
import { useAuth } from '@/context/authContext'
import { User } from '@/interfaces/user/user.interfaces'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import { blurHash } from '@/utils/common'
import TextInput from '@/components/TextInput'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AvoidingKeyboard } from '@/components/AvoidingKeyboard'
import Button from '@/components/Button'
import * as Updates from 'expo-updates'
import { yupResolver } from '@hookform/resolvers/yup'
import { userUpdateProfileSchema } from '@/schemas/user/userUpdateProfile.schema'
import throttle from '@/utils/throttle'

export default function Profile() {
    const { user, updateUserProfile } = useAuth()
    const userData: User = user as unknown as User
    const { control, handleSubmit, getValues } = useForm({
        resolver: yupResolver(userUpdateProfileSchema),
    })
    const { isUpdateAvailable, isUpdatePending } = Updates.useUpdates()
    console.log(userData?.id)

    useEffect(() => {
        if (isUpdatePending) {
            Updates.reloadAsync()
        }
    }, [isUpdatePending])

    const showButtonUpdate = isUpdateAvailable

    const handleUpdateProfile: SubmitHandler<{
        name: string
        imageUrl: string
    }> = throttle(async (data: { name: string; imageUrl: string }) => {
        console.log(data)
        await updateUserProfile(userData?.id, data.name, data.imageUrl)
            .then(() => {
                Alert.alert('Profile Updated', 'Your profile has been updated')
            })
            .catch((error) => {
                console.log(error)
            })
    }, 1000)

    return (
        <AvoidingKeyboard className="flex-1 bg-white">
            <View
                style={{
                    paddingTop: hp(4),
                    paddingHorizontal: wp(5),
                }}
                className="gap-4"
            >
                <View className="items-center">
                    <Image
                        style={{
                            height: hp(20),
                            aspectRatio: 1,
                            borderRadius: 100,
                        }}
                        source={
                            userData.imageUrl || 'https://i.pravatar.cc/300'
                        }
                        contentFit="cover"
                        transition={800}
                        placeholder={blurHash}
                    />
                </View>
                <View style={{ marginTop: hp(4) }} className="gap-4">
                    <TextInput
                        control={control}
                        name="email"
                        label="Email"
                        value={userData.email}
                        placeholder="Name"
                    />
                    <TextInput
                        label="User Name"
                        control={control}
                        value={userData.name}
                        name="name"
                        placeholder="Name"
                    />
                </View>
            </View>
            <View
                style={{ paddingTop: hp(4), paddingHorizontal: wp(5) }}
                className="gap-4"
            >
                <Button
                    label="Update Profile"
                    mode="contained"
                    onPress={() =>
                        handleSubmit(() =>
                            handleUpdateProfile(
                                getValues() as {
                                    name: string
                                    imageUrl: string
                                }
                            )
                        )()
                    }
                />
                <Button
                    label={
                        showButtonUpdate
                            ? `Update Available`
                            : `Check For Updates`
                    }
                    mode="outline"
                    onPress={() =>
                        showButtonUpdate
                            ? Updates.fetchUpdateAsync()
                            : Updates.checkForUpdateAsync()
                    }
                />
                <Text
                    style={{ fontSize: hp(2) }}
                    className="text-neutral-600 font-semibold tracking-wider text-center"
                >
                    Version: {Updates.runtimeVersion}
                </Text>
            </View>
        </AvoidingKeyboard>
    )
}
