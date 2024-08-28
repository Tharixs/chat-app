import ChatList from '@/features/home/components/ChatList'
import { useAuthContext } from '@/context/authContext'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import React, { useCallback, useEffect } from 'react'
import { Alert, StatusBar, View } from 'react-native'
import { getAllUsers } from '@/services/userService'

const Home = () => {
    const { user } = useAuthContext()
    const [users, setUsers] = React.useState<
        FirebaseFirestoreTypes.DocumentData[]
    >([])
    const [loading, setLoading] = React.useState<boolean>(false)

    const loadAllUsers = useCallback(async () => {
        setLoading(true)
        try {
            if (!user) return
            const usersData = await getAllUsers(user?.id!)
            setUsers(usersData)
        } catch (error) {
            console.log((error as Error).message)
            Alert.alert('Error fetching users', (error as Error).message)
        } finally {
            setLoading(false)
        }
    }, [user])

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

export default Home
