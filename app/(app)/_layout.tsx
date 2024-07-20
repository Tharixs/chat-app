import HomeHeader from '@/components/home/HomeHeader'
import { Stack } from 'expo-router'
import React from 'react'

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
        </Stack>
    )
}
