import { Platform } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useForm } from 'react-hook-form'
import useDebounce from '@/hooks/useDebounce'
import { getAllUsers } from '@/services/userService'
import { useModalActionContext } from '@/context/modalContext'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import SearchView from './SearchView'

const Search = () => {
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
        <SearchView
            users={users}
            control={control}
            refetch={fetchAllUsersWithSearchParams}
        />
    )
}

export default Search
