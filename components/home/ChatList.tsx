import { View, FlatList } from 'react-native'
import React from 'react'
import ChatItem from './ChatItem'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { User } from '@/interfaces/user/user.interfaces'

export default function ChatList({
    users,
}: {
    users: FirebaseFirestoreTypes.DocumentData[]
}) {
    return (
        <View className="flex-1">
            <FlatList
                data={users}
                contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <ChatItem
                        item={item as User}
                        noBorder={index === users.length - 1}
                    />
                )}
            />
        </View>
    )
}
