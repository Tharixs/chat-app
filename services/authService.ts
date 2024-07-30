import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export const login = async (email: string, password: string) => {
    try {
        await auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
        console.error('error login', error)
        throw new Error('Please input correct email and password or register !')
    }
}
export const logout = async () => {
    try {
        await auth().signOut()
    } catch (error) {
        console.error('error logout', error)
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
                name: userName,
                email: res?.user?.email,
                createdAt: firestore.FieldValue.serverTimestamp(),
            })
        }
    } catch (error) {
        console.error('error register', error)
        throw new Error('User already exists!')
    }
}
