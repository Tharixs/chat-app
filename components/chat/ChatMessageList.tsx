import { FlatList, RefreshControl, Text, View } from 'react-native'
import React from 'react'
import { ChatMessageItem } from './ChatMessageItem'
import { useAuthContext } from '@/context/authContext'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import Loading from '../Loading'

export const ChatMessageList: React.FC<{
    loading: boolean
    messages: FirebaseFirestoreTypes.DocumentData[]
    refetch: () => void
}> = (props) => {
    const user = useAuthContext().user

    return (
        <FlatList
            data={props.messages}
            refreshControl={
                <RefreshControl
                    refreshing={props.loading}
                    onRefresh={props.refetch}
                />
            }
            contentContainerStyle={{ marginTop: 16 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
                <>
                    <View className="flex-1 justify-center align-center">
                        {props.loading ? (
                            <Loading size={hp(5)} />
                        ) : (
                            <Text
                                style={{ fontSize: hp(2) }}
                                className="text-center font-medium text-neutral-800"
                            >
                                No messages
                            </Text>
                        )}
                    </View>
                </>
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
