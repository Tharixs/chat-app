import firestore from '@react-native-firebase/firestore'
import { FirebaseStorageTypes } from '@react-native-firebase/storage'
import * as ImagePicker from 'expo-image-picker'

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
        updateDataUser(data?.id!)
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
        throw new Error(`Error uploading image ${error}`)
    }
}
