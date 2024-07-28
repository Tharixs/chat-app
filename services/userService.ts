import firestore from '@react-native-firebase/firestore'

export const updateDataUser = async (userId: string) => {
    try {
        const users = await firestore().collection('users').doc(userId).get()
        if (users.exists) {
            return users.data()
        }
        throw new Error('User not found')
    } catch (error) {
        console.error('error fetch users', error)
        throw new Error('Error fetching users')
    }
}

export const updateUserProfile = async (data: Partial<User>) => {
    try {
        await firestore()
            .collection('users')
            .doc(data.id)
            .update({
                ...(data.name && { name: data.name }),
                ...(data.imageUrl && { imageUrl: data.imageUrl }),
            })
            .then(() => {
                updateDataUser(data?.id!)
            })
    } catch (error) {
        console.error('error update user', error)
        throw new Error('Error updating user')
    }
}

export const getAllUsers = async (userId: string) => {
    try {
        const querySnapshot = await firestore()
            .collection('users')
            .where('id', '!=', userId)
            .get()
        const users = querySnapshot.docs.map((doc) => doc.data())
        return users
    } catch (error) {
        console.error('error fetch users', error)
        throw new Error('Error fetching users')
    }
}

export const getUserById = async (userId: string) => {
    try {
        const querySnapshot = await firestore()
            .collection('users')
            .where('id', '==', userId)
            .get()
        const users = querySnapshot.docs.map((doc) => doc.data())
        return users
    } catch (error) {
        console.error('error fetch users', error)
        throw new Error('Error fetching users')
    }
}
