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
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import MenuItem from '@/components/pop-up-menu/MenuItem'
import { AntDesign, Feather } from '@expo/vector-icons'

type ProfileViewTypeProps = {
    pickImage: (source: 'library' | 'camera') => Promise<void>
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
                <Menu style={{ alignItems: 'center' }}>
                    <MenuTrigger
                        customStyles={{
                            TriggerTouchableComponent: TouchableOpacity,
                        }}
                    >
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
                        />
                    </MenuTrigger>
                    <MenuOptions
                        customStyles={{
                            optionsContainer: {
                                borderRadius: 10,
                                borderCurve: 'continuous',
                                marginTop: 110,
                                marginLeft: 75,
                                backgroundColor: 'white',
                                shadowOpacity: 0.2,
                                shadowOffset: { height: 0, width: 0 },
                                width: 160,
                            },
                        }}
                    >
                        <MenuItem
                            onClick={() => pickImage('camera')}
                            text="Camera"
                            value={null}
                            icon={
                                <Feather
                                    name="camera"
                                    size={hp(2.5)}
                                    color={'gray'}
                                />
                            }
                        />
                        <View className="border-b p-[1px] border-gray-300 mx-3" />
                        <MenuItem
                            onClick={() => pickImage('library')}
                            text="Albums"
                            value={null}
                            icon={
                                <AntDesign
                                    name="folderopen"
                                    size={hp(2.5)}
                                    color={'gray'}
                                />
                            }
                        />
                    </MenuOptions>
                </Menu>
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
