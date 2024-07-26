import ChatList from '@/components/home/ChatList'
import { useAuth } from '@/context/authContext'
import firestore, {
    FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore'
import React, { useEffect } from 'react'
import { ActivityIndicator, StatusBar, View } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default function Home() {
    const { user } = useAuth()
    const [users, setUsers] = React.useState<
        FirebaseFirestoreTypes.DocumentData[]
    >([])
    useEffect(() => {
        if (user?.uid) {
            fetchUsers()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchUsers = async () => {
        const querySnapshot = await firestore()
            .collection('users')
            .where('id', '!=', user?.uid)
            .get()
        const users = querySnapshot.docs.map((doc) => doc.data())
        setUsers(users)
    }
    return (
        <View className="flex-1 bg-white">
            <StatusBar barStyle={'dark-content'} />
            {users.length > 0 ? (
                <ChatList users={users} />
            ) : (
                <View className="flex items-center" style={{ top: hp(30) }}>
                    <ActivityIndicator size={'large'} color="grey" />
                </View>
            )}
        </View>
    )
}
