import { View, FlatList, Text, RefreshControl } from 'react-native'
import React from 'react'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import SearchUserItem from './SearchUserItem'

const SearchUserList = ({
    users,
    refetch,
    loading,
}: {
    users: FirebaseFirestoreTypes.DocumentData[]
    refetch: () => void
    loading: boolean
}) => {
    console.log('users', users)
    return (
        <View className="flex-1">
            <FlatList
                data={users}
                contentContainerStyle={{ paddingVertical: 25 }}
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
                    <SearchUserItem
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

export default SearchUserList
