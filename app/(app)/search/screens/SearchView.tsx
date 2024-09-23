import { View, Platform } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import SearchUserList from '../components/SearchUserList'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TextInput from '@/components/TextInput'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { Control, FieldValues } from 'react-hook-form'

const ios = Platform.OS === 'ios'

type SearchViewTypeProps = {
    users: FirebaseFirestoreTypes.DocumentData[]
    control: Control<FieldValues, any>
    refetch: () => Promise<void>
}
const SearchView: React.FC<SearchViewTypeProps> = ({
    users,
    control,
    refetch,
}) => {
    const { top } = useSafeAreaInsets()
    return (
        <View
            style={{ flex: 1, paddingTop: ios ? top : top + 10 }}
            className="px-4 bg-white"
        >
            <TextInput
                control={control}
                icon={
                    <Feather
                        className="mr-2"
                        name="search"
                        size={24}
                        color={'gray'}
                    />
                }
                name="search"
                placeholder="Search..."
            />
            <SearchUserList users={users} refetch={refetch} loading={false} />
        </View>
    )
}

export default SearchView
