import { Feather } from '@expo/vector-icons'
import { router, Stack } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import HomeHeader from './components/HomeHeader'
import ChatHeader from './chat/components/ChatHeader'

export default function Homelayout() {
    const DefaultHeaderScreen = ({ label }: { label: string }) => {
        return (
            <TouchableOpacity
                className="flex-row items-center gap-4"
                onPress={() => router.back()}
            >
                <Feather name="arrow-left" size={24} color="black" />
                <Text
                    style={{ fontSize: hp(2) }}
                    className="font-semibold text-neutral-800"
                >
                    {label}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <Stack>
            <Stack.Screen
                name="index"
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
                    headerLeft: () => <DefaultHeaderScreen label="Profile" />,
                }}
            />

            <Stack.Screen
                name="search"
                options={{
                    animation: 'slide_from_left',
                    headerTitle: '',
                    headerShadowVisible: false,
                    headerShown: false,
                }}
            />
        </Stack>
    )
}
