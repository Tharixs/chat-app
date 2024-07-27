import { View, FlatList, Text, RefreshControl } from 'react-native'
import React from 'react'
import ChatItem from './ChatItem'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { User } from '@/interfaces/user/user.interfaces'

export default function ChatList({
    users,
    refetch,
    loading,
}: {
    users: FirebaseFirestoreTypes.DocumentData[]
    refetch: () => void
    loading: boolean
}) {
    return (
        <View className="flex-1">
            <FlatList
                data={users}
                contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        colors={['white']}
                        progressBackgroundColor="rgb(225 29 72)"
                        refreshing={loading}
                        onRefresh={refetch}
                    />
                }
                renderItem={({ item, index }) => (
                    <ChatItem
                        item={item as User}
                        noBorder={index === users.length - 1}
                    />
                )}
                ListEmptyComponent={() => (
                    <View className="flex-1 items-center justify-center">
                        <Text className="text-lg font-bold">
                            {loading ? 'Loading...' : 'No users found'}
                        </Text>
                    </View>
                )}
            />
        </View>
    )
}
