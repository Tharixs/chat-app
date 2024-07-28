import ChatList from '@/components/home/ChatList'
import { useAuthContext } from '@/context/authContext'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import React, { useEffect } from 'react'
import { StatusBar, View } from 'react-native'

export default function Home() {
    const { fetchAllUsers } = useAuthContext()
    const [users, setUsers] = React.useState<
        FirebaseFirestoreTypes.DocumentData[]
    >([])
    const [loading, setLoading] = React.useState<boolean>(false)

    useEffect(() => {
        const loadAllUsers = async () => {
            setLoading(true)
            const usersData = await fetchAllUsers()
            setUsers(usersData)
            setLoading(false)
        }
        loadAllUsers()
    }, [fetchAllUsers])

    return (
        <View className="flex-1 bg-white">
            <StatusBar barStyle={'dark-content'} />
            <ChatList users={users} refetch={fetchAllUsers} loading={loading} />
        </View>
    )
}
