import { useEffect, useState } from 'react'
import { useAuth } from '@/context/authContext'
import firestore, {
    FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore'

export const useUsers = () => {
    const { user } = useAuth()
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState<FirebaseFirestoreTypes.DocumentData[]>(
        []
    )

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
    return { users, fetchUsers, loading }
}
