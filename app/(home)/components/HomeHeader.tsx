import { View, Text, Platform } from 'react-native'
import { Image } from 'expo-image'
import React, { useState } from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuthContext } from '@/context/authContext'
import { blurHash } from '@/utils/common'
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import MenuItem from '@/components/pop-up-menu/MenuItem'
import { AntDesign, Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useModalActionContext } from '@/context/modalContext'
import throttle from '@/utils/throttle'
import TextInput from '@/components/TextInput'
import { useForm } from 'react-hook-form'

const ios = Platform.OS === 'ios'
const HomeHeader = () => {
    const { top } = useSafeAreaInsets()
    const { user } = useAuthContext()
    const { handleLogout: logout } = useAuthContext()
    const { openModal } = useModalActionContext()
    const [onFocuse, setOnFocuse] = useState(false)
    const { control } = useForm()

    const handleLogout = async () => {
        try {
            await logout()
        } catch (error) {
            openModal({
                body: (error as Error).message,
                title: 'Logout Failed',
                typeModal: 'fail',
            })
        }
    }

    const handleGoProfileTrotle = throttle(() => {
        router.push('profile')
    }, 1000)

    return (
        <View
            style={{ paddingTop: ios ? top : top + 10 }}
            className={`${onFocuse ? 'p-2 bg-white' : 'flex-row justify-between px-5 bg-rose-600 pb-6 rounded-b-2xl shadow items-center'}`}
        >
            {onFocuse ? (
                <TextInput
                    control={control}
                    value=""
                    autoFocus
                    onEndEditing={() => setOnFocuse(!onFocuse)}
                    placeholder="Search for chat ..."
                    icon={
                        <Feather
                            className="mr-2"
                            name="search"
                            size={hp(2.8)}
                            color="gray"
                        />
                    }
                    positionIcon="left"
                />
            ) : (
                <>
                    <View>
                        <Text
                            style={{ fontSize: hp(3) }}
                            className="font-medium text-white"
                        >
                            Chatingan
                        </Text>
                    </View>
                    <View className="flex-row gap-4 items-center">
                        <Feather
                            name="search"
                            size={hp(2.8)}
                            color="white"
                            onPress={() => router.push('search')}
                        />
                        <View>
                            <Menu>
                                <MenuTrigger>
                                    <Image
                                        style={{
                                            height: hp(4.3),
                                            aspectRatio: 1,
                                            borderRadius: 100,
                                        }}
                                        source={
                                            user?.imageUrl ??
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
                                            marginTop: 40,
                                            marginLeft: -30,
                                            backgroundColor: 'white',
                                            shadowOpacity: 0.2,
                                            shadowOffset: {
                                                height: 0,
                                                width: 0,
                                            },
                                            width: 160,
                                        },
                                    }}
                                >
                                    <MenuItem
                                        onClick={handleGoProfileTrotle}
                                        text="Profile"
                                        value={null}
                                        icon={
                                            <Feather
                                                name="user"
                                                size={hp(2.5)}
                                            />
                                        }
                                    />
                                    <View className="border-b p-[1px] border-gray-300 mx-3" />
                                    <MenuItem
                                        onClick={async () => {
                                            // const data = await getFCMTokenByUserId(
                                            //     userData?.id
                                            // )
                                            await handleLogout()
                                            // await updateFCMToken({
                                            //     createdAt: data?.createdAt,
                                            //     fcmToken: data?.fcmToken,
                                            //     revoked: true,
                                            //     userId: data?.userId,
                                            // })
                                        }}
                                        text="Sign out"
                                        value={null}
                                        icon={
                                            <AntDesign
                                                name="logout"
                                                size={hp(2.5)}
                                                color="red"
                                            />
                                        }
                                    />
                                </MenuOptions>
                            </Menu>
                        </View>
                    </View>
                </>
            )}
        </View>
    )
}
export default HomeHeader
