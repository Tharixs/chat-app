import { useAuthContext } from '@/context/authContext'
import React, { useCallback, useEffect } from 'react'
import { Alert, StatusBar, View } from 'react-native'
import { getUserById } from '@/services/userService'
import ChatList from '../components/ChatList'

const Home = () => {
    const { user } = useAuthContext()
    const [users, setUsers] = React.useState<User>()
    const [loading, setLoading] = React.useState<boolean>(false)

    const loadAllUsers = useCallback(async () => {
        setLoading(true)
        try {
            if (!user) return
            const usersData = await getUserById(user?.id!)
            setUsers(usersData as User)
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
            <ChatList
                users={users?.followings}
                refetch={() => loadAllUsers()}
                loading={loading}
            />
        </View>
    )
}

export default Home
