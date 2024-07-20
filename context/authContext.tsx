import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore'
import { Alert } from 'react-native'

type AuthContextProps = {
    user?: FirebaseAuthTypes.User | null
    isAuthenticated: boolean | undefined
    login: (email: string, password: string) => Promise<void>
    loginOut: () => Promise<void>
    register: (
        email: string,
        password: string,
        userName: string,
        imageUrl?: string
    ) => Promise<void>
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined)

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>()
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
        undefined
    )

    useEffect(() => {
        const unsubs = auth().onAuthStateChanged((user) => {
            if (user) {
                setIsAuthenticated(true)
                setUser(user)
                updateUser(user.uid)
            } else {
                setIsAuthenticated(false)
                setUser(null)
            }
        })
        return unsubs
    }, [])

    const updateUser = async (userId: string) => {
        await firestore()
            .collection('users')
            .doc(userId)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    setUser(doc.data() as FirebaseAuthTypes.User)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const login = async (email: string, password: string) => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('logged in')
            })
            .catch((error) => {
                console.log(error)
                Alert.alert(
                    'Invalid email or password !',
                    'Please check your email and password'
                )
            })
    }
    const loginOut = async () => {
        auth()
            .signOut()
            .then(() => {
                console.log('User signed out!')
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const register = async (
        email: string,
        password: string,
        userName: string,
        imageUrl?: string
    ) => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async (res) => {
                console.log('Registered', res)
                await firestore()
                    .collection('users')
                    .doc(res.user?.uid)
                    .set({
                        id: res.user?.uid,
                        name: userName,
                        email: email,
                        imageUrl: imageUrl,
                        createdAt:
                            firebase.firestore.FieldValue.serverTimestamp(),
                    })
                    .then(() => {
                        console.log('added to firestore')
                    })
                    .catch((error) => {
                        console.log('Error adding document firestore:', error)
                    })
            })
            .catch((error) => {
                console.log('error in register', error)
            })
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                login,
                loginOut,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextProps => {
    const value = useContext(AuthContext)
    if (!value) {
        throw new Error('useAuth must be used within an AuthContextProvider')
    }
    return value
}
