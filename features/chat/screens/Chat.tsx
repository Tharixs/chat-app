import { Alert, FlatList } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useGlobalSearchParams } from 'expo-router'
import throttle from '@/utils/throttle'
import { useAuthContext } from '@/context/authContext'
import { useRoomChatContext } from '@/context/roomChatContext'
import ChatView from './ChatView'

const Chat = () => {
    const user = useAuthContext().user
    const item = JSON.parse(useGlobalSearchParams()?.item as string)
    const { control, handleSubmit, getValues, reset } = useForm()
    const { getAllMessages, sendMessage, messages, loading } =
        useRoomChatContext()
    const ref = useRef<FlatList<any>>(null)

    useEffect(() => {
        if (!user || !item) return
        const unsubscribe = getAllMessages(user?.id, item?.id)
        return unsubscribe
    }, [getAllMessages, item, user])

    const handleSendMessage: SubmitHandler<{ message: string }> = throttle(
        async (data: { message: string }) => {
            if (!user || !item) return
            try {
                await sendMessage(user?.id, item?.id, data.message)
                reset()
            } catch (error) {
                console.error(error)
                Alert.alert('Error message', `${(error as Error).message}`)
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
            loading={
                loading.createRoomChat ||
                loading.getMessages ||
                loading.sendMessage
            }
            getAllMessages={() => user && getAllMessages(user?.id, item?.id)}
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
