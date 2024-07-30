import ChatList from '@/components/home/ChatList'
import { useAuthContext } from '@/context/authContext'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import React, { useCallback, useEffect } from 'react'
import { Alert, StatusBar, View } from 'react-native'

export default function Home() {
    const { fetchAllUsers } = useAuthContext()
    const [users, setUsers] = React.useState<
        FirebaseFirestoreTypes.DocumentData[]
    >([])
    const [loading, setLoading] = React.useState<boolean>(false)

    const loadAllUsers = useCallback(async () => {
        setLoading(true)
        try {
            const usersData = await fetchAllUsers()
            setUsers(usersData)
        } catch (error) {
            console.log((error as Error).message)
            Alert.alert('Error fetching users', (error as Error).message)
        } finally {
            setLoading(false)
        }
    }, [fetchAllUsers])

    useEffect(() => {
        loadAllUsers()
    }, [loadAllUsers])

    return (
        <View className="flex-1 bg-white">
            <StatusBar barStyle={'dark-content'} />
            <ChatList users={users} refetch={loadAllUsers} loading={loading} />
        </View>
    )
}
