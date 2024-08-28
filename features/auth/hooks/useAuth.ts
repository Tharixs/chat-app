import { login, logout } from '@/services/authService'
import {
    getUserById,
    updateDataUser,
    updateUserProfile,
    uploadImage,
} from '@/services/userService'
import auth from '@react-native-firebase/auth'
import { useCallback } from 'react'
import * as ImagePicker from 'expo-image-picker'
import storage from '@react-native-firebase/storage'
import { useMMKVBoolean, useMMKVObject } from 'react-native-mmkv'

export const useAuth = () => {
    const [user, setUser] = useMMKVObject<User | null>('user')
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

    const handleLogout = async () => {
        try {
            await logout()
            setIsAuthenticated(false)
            setUser(null)
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
            throw new Error((error as Error).message)
        }
    }

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
    }, [setUser])

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
        handleLogin,
        handleUpdateUserProfile,
        refetchUser,
        handleGetUserById,
        handleLogout,
    }
}
