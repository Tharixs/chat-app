import { getRoomId } from '@/utils/getRoomId'
import firestore, {
    collection,
    FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore'

export const sendMessage = async (
    userSenderId: string,
    userReceiverId: string,
    message: string
) => {
    try {
        if (message === '') return
        const roomId = getRoomId(userSenderId, userReceiverId)
        const docRef = firestore().collection('rooms').doc(roomId)
        const messageRef = collection(docRef, 'messages')
        await messageRef.add({
            userId: userSenderId,
            text: message,
            createdAt: firestore.FieldValue.serverTimestamp(),
        })
    } catch (error) {
        console.log(error)
        throw new Error('Error sending message')
    }
}

export const getAllMessages = (
    userSenderId: string,
    userReceiverId: string,
    setMessages: React.Dispatch<
        React.SetStateAction<FirebaseFirestoreTypes.DocumentData[]>
    >
) => {
    try {
        const roomId = getRoomId(userSenderId, userReceiverId)
        const messageRef = firestore()
            .collection('rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy('createdAt', 'desc')
        return messageRef.onSnapshot((querySnapshot) => {
            const messages = querySnapshot.docs.map((doc) => doc.data())
            setMessages(messages)
        })
    } catch (error) {
        console.log(error)
        throw new Error((error as Error).message)
    }
}

export const getLastMessage = (
    userSenderId: string,
    userReceiverId: string
) => {
    const roomId = getRoomId(userSenderId, userReceiverId)
    const messageRef = firestore()
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .limit(1)
    return messageRef
}
