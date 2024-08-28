import firestore from '@react-native-firebase/firestore'
import { FirebaseStorageTypes } from '@react-native-firebase/storage'
import * as ImagePicker from 'expo-image-picker'

export const updateDataUser = async (userId: string) => {
    try {
        const users = await firestore().collection('users').doc(userId).get()
        if (users.exists) {
            return users.data()
        }
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
                ...(data.userName && { userName: data.userName }),
                ...(data.imageUrl && { imageUrl: data.imageUrl }),
            })
        updateDataUser(data?.id!)
    } catch (error) {
        console.error('error update user', error)
        throw new Error('Error updating user')
    }
}

export const getAllUsers = async (userId?: string, searchByName?: string) => {
    try {
        if (userId && !searchByName) {
            const querySnapshot = await firestore()
                .collection('users')
                .where('id', '!=', userId)
                .get()
            const users = querySnapshot.docs.map((doc) => doc.data())
            return users
        } else {
            const querySnapshot = await firestore()
                .collection('users')
                .where('userName', '>=', searchByName)
                .where('userName', '<=', searchByName + '\uf8ff')
                .get()
            const users = querySnapshot.docs.map((doc) => doc.data())
            return users
        }
    } catch (error) {
        console.error('error fetch users', error)
        throw new Error((error as Error).message)
    }
}

export const getUserById = async (userId: string) => {
    try {
        const querySnapshot = await firestore()
            .collection('users')
            .where('id', '==', userId)
            .get()
        const user = querySnapshot.docs.map((doc) => doc.data())
        return user[0]
    } catch (error) {
        console.error('Error User', error)
        throw new Error((error as Error).message)
    }
}

export const uploadImage = async (
    uri: ImagePicker.ImagePickerAsset,
    storageRef: FirebaseStorageTypes.Reference
) => {
    const snapshot = storageRef.putFile(uri.uri)
    snapshot.on('state_changed', (taskSnapshot) => {
        console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
        )
    })
    try {
        await snapshot
        const imageUrl = await storageRef.getDownloadURL()
        return imageUrl
    } catch (error) {
        console.error('error upload image', error)
        throw new Error((error as Error).message)
    }
}
