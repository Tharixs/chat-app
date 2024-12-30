import { FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useGlobalSearchParams } from 'expo-router'
import throttle from '@/utils/throttle'
import { useAuthContext } from '@/context/authContext'
import ChatView from './ChatView'
import { useModalActionContext } from '@/context/modalContext'
import { getAllMessages, sendMessage } from '@/services/roomChatService'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

const Chat = () => {
    const { user } = useAuthContext()
    const { idReceiver } = useGlobalSearchParams()
    const { control, handleSubmit, getValues, reset, formState } = useForm()
    const { openModal } = useModalActionContext()
    const ref = useRef<FlatList<any>>(null)
    const [messages, setMessages] = useState<
        FirebaseFirestoreTypes.DocumentData[]
    >([])

    useEffect(() => {
        if (!user || !idReceiver) return
        const unsubscribe = getAllMessages(
            user?.id,
            String(idReceiver),
            setMessages
        )
        return unsubscribe
    }, [idReceiver, user])

    const handleSendMessage: SubmitHandler<{ message: string }> = throttle(
        async (data: { message: string }) => {
            try {
                if (!user || !idReceiver) {
                    openModal({
                        typeModal: 'fail',
                        body: 'Please login first',
                        title: 'Error',
                    })
                } else {
                    await sendMessage(
                        user?.id,
                        String(idReceiver),
                        data.message
                    )
                    reset()
                }
            } catch (error) {
                console.error(error)
                openModal({
                    typeModal: 'fail',
                    body: (error as Error).message,
                    title: 'Error',
                })
            }
            setTimeout(() => {
                ref.current?.scrollToEnd({ animated: true })
            }, 100)
        },
        1000
    )

    return (
        <ChatView
            control={control}
            loading={formState.isSubmitting}
            getAllMessages={() =>
                user &&
                getAllMessages(user?.id, String(idReceiver), setMessages)
            }
            messages={messages}
            onSubmit={() =>
                handleSubmit(() =>
                    handleSendMessage(
                        getValues() as {
                            message: string
                        }
                    )
                )()
            }
        />
    )
}
export default Chat
