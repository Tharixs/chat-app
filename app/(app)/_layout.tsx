import ChatHeader from '@/components/chat/ChatHeader'
import HomeHeader from '@/components/home/HomeHeader'
import { Feather } from '@expo/vector-icons'
import { router, Stack } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default function _layout() {
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
                    headerLeft: () => <ChatHeader />,
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
