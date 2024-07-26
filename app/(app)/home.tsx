import ChatList from '@/components/home/ChatList'
import { useUsers } from '@/hooks/useUsers'
import React from 'react'
import { StatusBar, View } from 'react-native'

export default function Home() {
    const { users, fetchUsers, loading } = useUsers()
    return (
        <View className="flex-1 bg-white">
            <StatusBar barStyle={'dark-content'} />
            <ChatList users={users} refetch={fetchUsers} loading={loading} />
        </View>
    )
}
