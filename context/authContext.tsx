import React, { ReactNode, createContext, useContext } from 'react'

import { useAuth } from '@/hooks/useAuth'
import ImagePicker from 'expo-image-picker'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

type AuthContextHooksProps = {
    user: User | null
    isAuthenticated: boolean | undefined
    setIsAuthenticated: (value: boolean) => void
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
    handleLogin: (email: string, password: string) => Promise<void>
}

type AuthContextProviderProps = {
    children: ReactNode
}

const AuthHooksContext = createContext<AuthContextHooksProps | null>(null)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const authHook = useAuth()
    return (
        <AuthHooksContext.Provider value={authHook}>
            {children}
        </AuthHooksContext.Provider>
    )
}

export const useAuthContext = (): AuthContextHooksProps => {
    const value = useContext(AuthHooksContext)
    if (!value) {
        throw new Error('useAuth must be used within an AuthContextProvider')
    }
    return value
}
