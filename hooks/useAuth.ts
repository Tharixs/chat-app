import { login, logout, register } from '@/services/authService'
import {
    getAllUsers,
    updateDataUser,
    updateUserProfile,
} from '@/services/userService'
import auth from '@react-native-firebase/auth'
import { useCallback, useEffect, useState } from 'react'

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
            throw new Error('Error login')
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
        userName: string,
        imageUrl?: string
    ) => {
        try {
            await register(email, password, userName, imageUrl)
        } catch (error) {
            console.log(error)
            throw new Error('Error register')
        }
    }
    const handleUpdateUserProfile = async (
        id: string,
        name?: string,
        imageUrl?: string
    ) => {
        try {
            await updateUserProfile({ id, name, imageUrl })
        } catch (error) {
            console.log(error)
            throw new Error('Error update user profile')
        }
    }

    const fetchAllUsers = useCallback(async () => {
        const userData = user as unknown as User
        if (userData) {
            try {
                return await getAllUsers(userData?.id)
            } catch (error) {
                console.log('fetchAllUsers', error)
                throw new Error('Error fetching all users')
            }
        }
        return []
    }, [user])

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

    return {
        user,
        isAuthenticated,
        handleLogin,
        handleLogout,
        handleRegister,
        handleUpdateUserProfile,
        fetchAllUsers,
        refetchUser,
    }
}
