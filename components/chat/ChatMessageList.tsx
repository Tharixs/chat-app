import { FlatList, RefreshControl, Text, View } from 'react-native'
import React from 'react'
import { ChatMessageItem } from './ChatMessageItem'
import { useRoomChat } from '@/context/roomChatContext'
import { useAuth } from '@/context/authContext'
import { User } from '@/interfaces/user/user.interfaces'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default function ChatMessageList() {
    const { loading, messages } = useRoomChat()
    const user = useAuth().user as unknown as User

    return (
        <FlatList
            data={messages}
            refreshControl={<RefreshControl refreshing={loading} />}
            contentContainerStyle={{ marginTop: 16 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
                <View className="justify-center align-center">
                    <Text
                        style={{ fontSize: hp(2) }}
                        className="text-center font-medium text-neutral-800"
                    >
                        No messages
                    </Text>
                </View>
            )}
            renderItem={({ item }) => (
                <ChatMessageItem
                    isSender={user?.id === item.userId}
                    message={item.text}
                />
            )}
        />
    )
}
