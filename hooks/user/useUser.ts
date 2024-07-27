import { useEffect, useState } from 'react'
import { useAuth } from '@/context/authContext'
import firestore, {
    FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore'
import { User } from '@/interfaces/user/user.interfaces'

export const useUser = () => {
    const { user } = useAuth()
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState<FirebaseFirestoreTypes.DocumentData[]>(
        []
    )
    const [userById, setUserById] = useState<User | null>(null)

    useEffect(() => {
        if (user?.uid) {
            fetchUsers()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchUsers = async () => {
        try {
            const querySnapshot = await firestore()
                .collection('users')
                .where('id', '!=', user?.uid)
                .get()
            const users = querySnapshot.docs.map((doc) => doc.data())
            setUsers(users)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const fetchUsersById = async (userId: string) => {
        try {
            const querySnapshot = await firestore()
                .collection('users')
                .where('id', '==', userId)
                .get()
            const users = querySnapshot.docs.map((doc) => doc.data())
            console.log('users', users[0])
            setUserById(users[0] as User)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return { users, fetchUsers, loading, fetchUsersById, userById }
}
