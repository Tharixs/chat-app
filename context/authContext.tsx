import React, { ReactNode, createContext, useContext } from 'react'

import { useAuth } from '@/hooks/useAuth'
import ImagePicker from 'expo-image-picker'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

type AuthContextProps = {
    user: User | null
    isAuthenticated: boolean | undefined
    handleLogin: (email: string, password: string) => Promise<void>
    handleLogout: () => Promise<void>
    handleRegister: (
        email: string,
        password: string,
        userName: string,
        imageUrl?: string
    ) => Promise<void>
    handleUpdateUserProfile: (
        id: string,
        userName?: string,
        imageUrl?: ImagePicker.ImagePickerAsset
    ) => Promise<void>
    fetchAllUsers: () => Promise<FirebaseFirestoreTypes.DocumentData[]>
    refetchUser: () => Promise<void>
    handleGetUserById: (
        userId: string
    ) => Promise<FirebaseFirestoreTypes.DocumentData>
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined)

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const auth = useAuth()

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuthContext = (): AuthContextProps => {
    const value = useContext(AuthContext)
    if (!value) {
        throw new Error('useAuth must be used within an AuthContextProvider')
    }
    return value
}
