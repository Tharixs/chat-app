import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export const login = async (email: string, password: string) => {
    try {
        await auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
        console.error('error login', (error as Error).message)
        if ((error as Error).message.includes('[auth/too-many-requests]')) {
            throw new Error('Too many requests, please try again later !')
        }
        throw new Error('Please input correct email and password or register !')
    }
}
export const logout = async () => {
    try {
        await auth().signOut()
    } catch (error) {
        throw new Error(error as any)
    }
}
export const register = async (
    email: string,
    password: string,
    userName: string
) => {
    try {
        const res = await auth().createUserWithEmailAndPassword(email, password)
        if (res.additionalUserInfo?.isNewUser) {
            await firestore().collection('users').doc(res.user?.uid).set({
                id: res.user?.uid,
                userName: userName,
                email: res?.user?.email,
                createdAt: firestore.FieldValue.serverTimestamp(),
            })
        }
    } catch (error) {
        console.error('error register', error)
        throw new Error(error as any)
    }
}

export const forgotPassword = async (email: string) => {
    try {
        await auth().sendPasswordResetEmail(email)
    } catch (error) {
        console.error('error forgot password', error)
        throw new Error(error as any)
    }
}
