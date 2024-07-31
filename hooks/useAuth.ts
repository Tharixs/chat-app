import { login, logout, register } from '@/services/authService'
import {
    getAllUsers,
    getUserById,
    updateDataUser,
    updateUserProfile,
    uploadImage,
} from '@/services/userService'
import auth from '@react-native-firebase/auth'
import { useCallback, useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import storage from '@react-native-firebase/storage'

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
        undefined
    )

    useEffect(() => {
        const unsubs = auth().onAuthStateChanged(async (user) => {
            if (user) {
                setIsAuthenticated(true)
                try {
                    const newUser = await updateDataUser(user?.uid)
                    setUser(newUser as User)
                } catch (error) {
                    console.log(error)
                }
            } else {
                setIsAuthenticated(false)
                setUser(null)
            }
        })
        return () => unsubs()
    }, [])

    const handleLogin = async (email: string, password: string) => {
        try {
            await login(email, password)
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    const handleLogout = async () => {
        try {
            await logout()
        } catch (error) {
            console.log(error)
            throw new Error('Error logout')
        }
    }

    const handleRegister = async (
        email: string,
        password: string,
        userName: string
    ) => {
        try {
            await register(email, password, userName)
        } catch (error) {
            console.log('register eror', error)
            throw error
        }
    }
    const handleUpdateUserProfile = async (
        id: string,
        name?: string,
        imageUrl?: ImagePicker.ImagePickerAsset
    ) => {
        try {
            if (imageUrl) {
                const fileName = 'image-user-profile.jpg'
                const storageRefImage = storage().ref(
                    `images/profile/${id}/${fileName}`
                )
                const resUpImage = await uploadImage(imageUrl, storageRefImage)
                await updateUserProfile({ id, name, imageUrl: resUpImage })
            } else {
                await updateUserProfile({ id, name })
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
        handleLogin,
        handleLogout,
        handleRegister,
        handleUpdateUserProfile,
        fetchAllUsers,
        refetchUser,
        handleGetUserById,
    }
}
