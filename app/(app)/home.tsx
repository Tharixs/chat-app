import ChatList from '@/components/home/ChatList'
import { useUser } from '@/hooks/user/useUser'
import React from 'react'
import { StatusBar, View } from 'react-native'

export default function Home() {
    const { users, fetchUsers, loading } = useUser()
    return (
        <View className="flex-1 bg-white">
            <StatusBar barStyle={'dark-content'} />
            <ChatList users={users} refetch={fetchUsers} loading={loading} />
        </View>
    )
}
