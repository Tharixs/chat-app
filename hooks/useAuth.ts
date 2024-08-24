import { login } from '@/services/authService'
import {
    getAllUsers,
    getUserById,
    updateDataUser,
    updateUserProfile,
    uploadImage,
} from '@/services/userService'
import auth from '@react-native-firebase/auth'
import { useCallback, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import storage from '@react-native-firebase/storage'
import { useMMKVBoolean } from 'react-native-mmkv'

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] =
        useMMKVBoolean('isAuthenticated')

    const handleLogin = async (email: string, password: string) => {
        try {
            await login(email, password)
            const newUser = await updateDataUser(auth().currentUser?.uid!)
            if (newUser) {
                setUser(newUser as User)
                setIsAuthenticated(true)
            } else {
                throw Error('No user found please contact support!')
            }
        } catch (error) {
            console.log(error)
            throw Error((error as Error).message)
        }
    }
    const handleUpdateUserProfile = async (
        id: string,
        userName?: string,
        imageUrl?: ImagePicker.ImagePickerAsset
    ) => {
        try {
            if (imageUrl) {
                const fileName = 'image-user-profile.jpg'
                const storageRefImage = storage().ref(
                    `images/profile/${id}/${fileName}`
                )
                const resUpImage = await uploadImage(imageUrl, storageRefImage)
                await updateUserProfile({ id, userName, imageUrl: resUpImage })
            } else {
                await updateUserProfile({ id, userName })
            }
        } catch (error) {
            console.log(error)
            throw new Error('Error update user profile')
        }
    }

    const fetchAllUsers = useCallback(async () => {
        if (auth().currentUser) {
            try {
                return await getAllUsers(auth().currentUser?.uid!)
            } catch (error) {
                console.log('fetchAllUsers', error)
                throw error
            }
        }
        return []
    }, [])

    const refetchUser = useCallback(async () => {
        const userData = auth().currentUser
        if (userData) {
            try {
                const newUserData = await updateDataUser(userData?.uid)
                setUser(newUserData as User)
            } catch (error) {
                console.log('refetchUser', error)
                throw new Error('Error refetching user')
            }
        }
    }, [])

    const handleGetUserById = useCallback(async (userId: string) => {
        try {
            const user = await getUserById(userId)
            return user
        } catch (error) {
            console.error('Error User', error)
            throw error
        }
    }, [])

    return {
        user,
        isAuthenticated,
        setIsAuthenticated,
        handleLogin,
        handleUpdateUserProfile,
        fetchAllUsers,
        refetchUser,
        handleGetUserById,
    }
}
