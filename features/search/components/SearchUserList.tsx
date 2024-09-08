import { View, FlatList, Text, RefreshControl } from 'react-native'
import React from 'react'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import SearchUserItem from './SearchUserItem/SearchUserItem'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

type SearchUserListTypeProps = {
    users: FirebaseFirestoreTypes.DocumentData[]
    refetch: () => void
    loading: boolean
}
const SearchUserList: React.FC<SearchUserListTypeProps> = ({
    users,
    refetch,
    loading,
}) => {
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
                    <View className="flex-1">
                        <Text
                            style={{ fontSize: hp(1.8) }}
                            className="text-lg font-bold text-neutral-500 text-center"
                        >
                            {loading ? 'Loading...' : 'No users found'}
                        </Text>
                    </View>
                )}
            />
        </View>
    )
}

export default SearchUserList
