import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import { blurHash } from '@/utils/common'
import TextInput from '@/components/TextInput'
import { AvoidingKeyboard } from '@/components/AvoidingKeyboard'
import Button from '@/components/Button'
import * as Updates from 'expo-updates'
import LotieAnimationIcon from '@/components/LotieAnimationIcon'
import { Control, FormState } from 'react-hook-form'

type ProfileViewTypeProps = {
    pickImage: () => void
    image?: string
    control: Control<
        {
            [x: string]: any
        },
        any
    >
    user: User | null
    formState: FormState<{
        [x: string]: any
    }>
    onSubmit: () => void
    updateLabel?: string
    onUpdate?: () => void
}
const ProfileView: React.FC<ProfileViewTypeProps> = ({
    pickImage,
    image,
    control,
    user,
    formState,
    onSubmit,
    updateLabel,
    onUpdate,
}) => {
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
                            source={require('../../../assets/images/loading.json')}
                        />
                    </View>
                ) : (
                    <Button
                        label="Update Profile"
                        mode="contained"
                        onPress={onSubmit}
                    />
                )}
                <Button label={updateLabel} mode="outline" onPress={onUpdate} />
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

export default ProfileView
