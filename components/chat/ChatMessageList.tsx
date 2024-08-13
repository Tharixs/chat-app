import { FlatList, RefreshControl, Text, View } from 'react-native'
import React from 'react'
import { ChatMessageItem } from './ChatMessageItem'
import { useAuthContext } from '@/context/authContext'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import LotieAnimationIcon from '../LotieAnimationIcon'

export const ChatMessageList: React.FC<{
    loading: boolean
    messages: FirebaseFirestoreTypes.DocumentData[]
    refetch: () => void
}> = (props) => {
    const user = useAuthContext().user

    return (
        <FlatList
            scrollEventThrottle={16}
            contentContainerClassName={`${props.messages.length === 0 && 'flex-1'}`}
            inverted
            data={props.messages}
            refreshControl={
                <RefreshControl
                    refreshing={props.loading}
                    onRefresh={props.refetch}
                    colors={['white']}
                    progressBackgroundColor="rgb(225 29 72)"
                />
            }
            contentContainerStyle={{ marginBottom: 16 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
                <View className="flex-1 justify-center align-center rotate-180">
                    {props.loading ? (
                        <LotieAnimationIcon
                            source={require('../../assets/images/loading.json')}
                            size={hp(5)}
                        />
                    ) : (
                        <Text
                            style={{ fontSize: hp(2) }}
                            className="text-center font-medium text-neutral-400"
                        >
                            No messages yet
                        </Text>
                    )}
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
