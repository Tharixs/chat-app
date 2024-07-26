import HomeHeader from '@/components/home/HomeHeader'
import { Feather } from '@expo/vector-icons'
import { Stack } from 'expo-router'
import React from 'react'
import { Menu, MenuTrigger } from 'react-native-popup-menu'

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
                    title: 'Chat Room',
                    animation: 'slide_from_right',
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
