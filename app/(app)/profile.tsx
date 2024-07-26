import { Text, View } from 'react-native'
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
import { useForm } from 'react-hook-form'
import { AvoidingKeyboard } from '@/components/AvoidingKeyboard'
import Button from '@/components/Button'
import * as Updates from 'expo-updates'

export default function Profile() {
    const { user } = useAuth()
    const userData: User = user as unknown as User
    const { control } = useForm()
    const { currentlyRunning, isUpdateAvailable, isUpdatePending } =
        Updates.useUpdates()

    useEffect(() => {
        if (isUpdatePending) {
            Updates.reloadAsync()
        }
    }, [isUpdatePending])

    const runTypeMessage = currentlyRunning.isEmbeddedLaunch
        ? 'This app is running from built-in code'
        : 'This app is running an update'

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
                        label="Email"
                        control={control}
                        value={userData.email}
                        name="eamil"
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
                    onPress={() => {}}
                />
                <Button
                    label={`${isUpdateAvailable ? 'Update' : 'Check For Updates'}`}
                    mode="outline"
                    onPress={() => {
                        if (isUpdateAvailable) {
                            Updates.fetchUpdateAsync()
                        } else {
                            Updates.checkForUpdateAsync()
                        }
                    }}
                />
                <Text
                    style={{ fontSize: hp(2) }}
                    className="text-neutral-600 font-semibold tracking-wider text-center"
                >
                    {runTypeMessage}
                </Text>
            </View>
        </AvoidingKeyboard>
    )
}
