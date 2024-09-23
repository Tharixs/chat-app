import React, { ReactNode, createContext, useContext } from 'react'

import ImagePicker from 'expo-image-picker'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { useAuth } from '@/app/(auth)/hooks/useAuth'

type AuthContextHooksProps = {
    user?: User | null
    isAuthenticated: boolean | undefined
    handleUpdateUserProfile: (
        id: string,
        userName?: string,
        imageUrl?: ImagePicker.ImagePickerAsset
    ) => Promise<void>
    refetchUser: () => Promise<void>
    handleGetUserById: (
        userId: string
    ) => Promise<FirebaseFirestoreTypes.DocumentData>
    handleLogin: (email: string, password: string) => Promise<void>
    handleLogout: () => Promise<void>
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
