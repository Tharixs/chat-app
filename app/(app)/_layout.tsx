import HomeHeader from '@/components/home/HomeHeader'
import { Feather } from '@expo/vector-icons'
import { router, Stack } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

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
                    // title: 'Chat Room',
                    headerTitle: '',
                    animation: 'slide_from_right',
                    headerLeft: () => (
                        <View>
                            <Feather
                                name="arrow-left"
                                size={24}
                                color="black"
                                onPress={() => router.back()}
                            />
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="profile"
                options={{
                    title: 'Profile User',
                    animation: 'slide_from_right',
                    headerShadowVisible: false,
                }}
            />
        </Stack>
    )
}
