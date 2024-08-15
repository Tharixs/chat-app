import firestore from '@react-native-firebase/firestore'
export const storeFCMToken = async (token: string, userId: string) => {
    try {
        if (token.includes('Error:')) return
        await firestore().collection('FcmTokens').doc(userId).set({
            userId: userId,
            fcmToken: token,
            createdAt: firestore.FieldValue.serverTimestamp(),
            revoked: false,
        })
    } catch (error) {
        console.error('error store fcm token', error)
        throw Error(error as string)
    }
}

export const getFCMTokenByUserId = async (userId: string) => {
    try {
        const querySnapshot = await firestore()
            .collection('FcmTokens')
            .where('userId', '==', userId)
            .where('revoked', '==', false)
            .limit(1)
            .get()
        const token = querySnapshot.docs.map((doc) => doc.data())
        return token[0]
    } catch (error) {
        console.error('error get fcm token', error)
        throw Error(error as string)
    }
}

export const updateFCMToken = async (data: Partial<FcmToken>) => {
    try {
        await firestore().collection('FcmTokens').doc(data.userId).update(data)
    } catch (error) {
        console.error('error update fcm token', error)
        throw Error(error as string)
    }
}
