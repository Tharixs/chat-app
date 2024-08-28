import { View, Platform } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useForm } from 'react-hook-form'
import TextInput from '@/components/TextInput'
import { Feather } from '@expo/vector-icons'
import useDebounce from '@/hooks/useDebounce'
import { getAllUsers } from '@/services/userService'
import { useModalActionContext } from '@/context/modalContext'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import SearchUserList from '../components/SearchUserList'

const ios = Platform.OS === 'ios'
const Search = () => {
    const { top } = useSafeAreaInsets()
    const [users, setUsers] = useState<FirebaseFirestoreTypes.DocumentData[]>(
        []
    )
    const { control, watch } = useForm()
    const { openModal } = useModalActionContext()
    const searchDebounce = useDebounce(watch('search'), 500)
    const fetchAllUsersWithSearchParams = useCallback(async () => {
        try {
            if (!searchDebounce) return
            const users = await getAllUsers(undefined, searchDebounce)
            if (!users) return
            setUsers(users)
        } catch (error) {
            openModal({
                body: (error as Error).message,
                title: 'Search Failed',
                typeModal: 'fail',
            })
        }
    }, [openModal, searchDebounce])

    useEffect(() => {
        fetchAllUsersWithSearchParams()
    }, [searchDebounce, fetchAllUsersWithSearchParams])

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
            <SearchUserList
                users={users}
                refetch={fetchAllUsersWithSearchParams}
                loading={false}
            />
        </View>
    )
}

export default Search
