import { View, FlatList, Text, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import HomeChatItem from './HomeChatItem/HomeChatItem'

interface UserWithMessage extends User {
    lastMessage: string | null
    lastMessageTime?: CreatedAt | null
}

export default function ChatList({
    users,
    refetch,
    loading,
}: {
    users: User['followings']
    refetch: () => void
    loading: boolean
}) {
    const [sortedUsers, setSortedUsers] = useState<UserWithMessage[]>([])

    useEffect(() => {
        if (users) {
            const initialUsers = users.map((user) => ({
                ...user,
                lastMessage: null,
                lastMessageTime: null,
            }))
            setSortedUsers(initialUsers)
        }
    }, [users])

    const updateLastMessage = useCallback(
        (userId: string, lastMessage: Message) => {
            setSortedUsers((prevUsers) => {
                const updatedUsers = prevUsers.map((user) => {
                    if (user.id === userId) {
                        return {
                            ...user,
                            lastMessage: lastMessage.text,
                            lastMessageTime: lastMessage.createdAt,
                        }
                    }
                    return user
                })

                // Sort users after updating last message
                const sorted = updatedUsers.sort((a, b) => {
                    const timeA = a.lastMessageTime
                        ? a.lastMessageTime.seconds
                        : -Infinity
                    const timeB = b.lastMessageTime
                        ? b.lastMessageTime.seconds
                        : -Infinity
                    return timeB - timeA // Terbaru ke terlama
                })
                return sorted
            })
        },
        []
    )

    return (
        <View className="flex-1">
            <FlatList
                data={sortedUsers}
                contentContainerStyle={{ paddingVertical: 25 }}
                keyExtractor={(item) => item.id}
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
                    <HomeChatItem
                        item={item}
                        onUpdateLastMessage={updateLastMessage}
                        noBorder={index === users?.length! - 1}
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
