import HomeHeader from '@/components/home/HomeHeader'
import { User } from '@/interfaces/user/user.interfaces'
import { blurHash } from '@/utils/common'
import { Feather } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { router, Stack, useGlobalSearchParams } from 'expo-router'
import React, { useMemo } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default function _layout() {
    const { item } = useGlobalSearchParams()
    const userData: User = useMemo(
        () => item && JSON.parse(item as string),
        [item]
    )

    return (
        <Stack>
            <Stack.Screen
                name="home"
                options={{ header: () => <HomeHeader /> }}
            />
            <Stack.Screen
                name="chat"
                options={{
                    headerTitle: '',
                    animation: 'slide_from_right',
                    headerShadowVisible: true,
                    headerLeft: () => (
                        <View className="flex-row items-center gap-4">
                            <Feather
                                name="arrow-left"
                                size={24}
                                color="black"
                                onPress={() => router.back()}
                            />
                            <Image
                                source={
                                    userData?.imageUrl ||
                                    require('@/assets/images/avatar.png')
                                }
                                style={{
                                    height: hp(4.5),
                                    aspectRatio: 1,
                                    borderRadius: 100,
                                }}
                                placeholder={blurHash}
                                contentFit="cover"
                            />
                            <Text
                                style={{ fontSize: hp(2) }}
                                className="font-semibold text-neutral-800"
                            >
                                {userData?.name ?? ''}
                            </Text>
                        </View>
                    ),
                    headerRight: () => (
                        <View className="flex-row items-center gap-4">
                            <TouchableOpacity>
                                <Feather
                                    name="video"
                                    size={24}
                                    color={'rgb(115 115 115)'}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Feather
                                    name="phone"
                                    size={24}
                                    color={'rgb(115 115 115)'}
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />

            <Stack.Screen
                name="profile"
                options={{
                    animation: 'slide_from_right',
                    headerShadowVisible: false,
                    headerTitle: '',
                    headerLeft: () => (
                        <TouchableOpacity
                            className="flex-row items-center gap-4"
                            onPress={() => router.back()}
                        >
                            <Feather
                                name="arrow-left"
                                size={24}
                                color="black"
                            />
                            <Text
                                style={{ fontSize: hp(2) }}
                                className="font-semibold text-neutral-800"
                            >
                                Profile
                            </Text>
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack>
    )
}
