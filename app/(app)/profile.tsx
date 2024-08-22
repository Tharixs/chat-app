import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
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
import { useImagePicker } from '@/hooks/useImagePicker'
import { useUpdateApp } from '@/hooks/useUpdateApp.hook'
import { useModalActionContext } from '@/context/modalContext'
import LotieAnimationIcon from '@/components/LotieAnimationIcon'

export default function Profile() {
    const { user, handleUpdateUserProfile, refetchUser } = useAuthContext()
    const { pickImage, imageRes, image } = useImagePicker()
    const { showButtonUpdate } = useUpdateApp()
    const { control, handleSubmit, getValues, formState } = useForm({
        resolver: yupResolver(userUpdateProfileSchema),
    })
    const { openModal } = useModalActionContext()
    const handleUpdateProfile: SubmitHandler<Partial<User>> = async (
        data: Partial<User>
    ) => {
        try {
            await handleUpdateUserProfile(user?.id!, data.userName, imageRes)
            await refetchUser()
            openModal({
                typeModal: 'success',
                title: 'Update Success !',
                body: 'You have successfully updated your profile',
            })
            router.replace('home')
        } catch (error) {
            console.error('error update user profile', error)
            openModal({
                typeModal: 'fail',
                title: 'Update Failed !',
                body: (error as Error).message,
            })
        }
    }

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
                            (image || user?.imageUrl) ??
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
                        value={user?.email}
                        editable={false}
                    />
                    <TextInput
                        label="User Name"
                        control={control}
                        value={user?.userName}
                        name="userName"
                    />
                </View>
            </View>
            <View
                style={{ paddingTop: hp(4), paddingHorizontal: wp(5) }}
                className="gap-4"
            >
                {formState.isSubmitting ? (
                    <View className="justify-center items-center">
                        <LotieAnimationIcon
                            size={hp(15.5)}
                            source={require('../../assets/images/loading.json')}
                        />
                    </View>
                ) : (
                    <Button
                        label="Update Profile"
                        mode="contained"
                        onPress={() =>
                            handleSubmit(() =>
                                handleUpdateProfile(getValues())
                            )()
                        }
                    />
                )}
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
