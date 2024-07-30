import { Platform, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { Image } from 'expo-image'
import { useAuthContext } from '@/context/authContext'
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
import { router } from 'expo-router'
import throttle from '@/utils/throttle'
import { useImagePicker } from '@/hooks/useImagePicker'
import { useUpdateApp } from '@/hooks/useUpdateApp.hook'
import { AntDesign } from '@expo/vector-icons'
import {
    Menu,
    MenuTrigger,
    MenuOptions,
    MenuOption,
} from 'react-native-popup-menu'

export default function Profile() {
    const { user, handleUpdateUserProfile, refetchUser } = useAuthContext()
    const userData: User = user as unknown as User
    const { pickImage, imageRes, image } = useImagePicker()
    const { showButtonUpdate } = useUpdateApp()
    const { control, handleSubmit, getValues } = useForm({
        resolver: yupResolver(userUpdateProfileSchema),
    })
    const handleUpdateProfile: SubmitHandler<Partial<User>> = throttle(
        async (data: Partial<User>) => {
            try {
                await handleUpdateUserProfile(userData.id, data.name, imageRes)
                await refetchUser()
                router.replace('home')
            } catch (error) {
                console.error('error update user profile', error)
            }
        },
        1000
    )

    return (
        <AvoidingKeyboard className="flex-1 bg-white">
            <View
                style={{
                    paddingTop: hp(4),
                    paddingHorizontal: wp(5),
                }}
                className="gap-4"
            >
                <TouchableOpacity className="items-center" onPress={pickImage}>
                    <Image
                        style={{
                            height: hp(20),
                            aspectRatio: 1,
                            borderRadius: 100,
                        }}
                        source={
                            (image || userData.imageUrl) ??
                            require('@/assets/images/avatar.png')
                        }
                        contentFit="cover"
                        transition={800}
                        placeholder={blurHash}
                        children
                    />
                </TouchableOpacity>
                <View style={{ marginTop: hp(4) }} className="gap-4">
                    <TextInput
                        control={control}
                        name="email"
                        label="Email"
                        value={userData.email}
                        placeholder="Name"
                        editable={false}
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
                        handleSubmit(() => handleUpdateProfile(getValues()))()
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
