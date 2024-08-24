import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export const login = async (email: string, password: string) => {
    try {
        const res = await auth().signInWithEmailAndPassword(email, password)
        return res
    } catch (error) {
        throw new Error((error as Error).message.split(']')[1])
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
