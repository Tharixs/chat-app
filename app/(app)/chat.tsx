import {
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    TouchableOpacity,
    View,
} from 'react-native'
import React, { useEffect, useRef } from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import TextInput from '@/components/TextInput'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Feather } from '@expo/vector-icons'
import { useGlobalSearchParams } from 'expo-router'
import throttle from '@/utils/throttle'
import { useAuthContext } from '@/context/authContext'
import { useRoomChat } from '@/hooks/useRoomChat'
import { ChatMessageList } from '@/components/chat/ChatMessageList'

export default function Chat() {
    const user = useAuthContext().user
    const item = JSON.parse(useGlobalSearchParams()?.item as string)
    const { control, handleSubmit, getValues, reset } = useForm()
    const { getAllMessages, sendMessage, messages, loading } = useRoomChat()
    const ref = useRef<FlatList<any>>(null)

    useEffect(() => {
        if (!user || !item) return
        const unsubscribe = getAllMessages(user?.id, item?.id)
        return unsubscribe
    }, [getAllMessages, item, user])

    const handleSendMessage: SubmitHandler<{ message: string }> = throttle(
        async (data: { message: string }) => {
            if (!user || !item) return
            await sendMessage(user?.id, item?.id, data.message).then(() => {
                reset()
            })
            setTimeout(() => {
                ref.current?.scrollToEnd({ animated: true })
            }, 100)
        },
        1000
    )

    return (
        <KeyboardAvoidingView className="flex-1 bg-white px-4">
            <View className="flex-1">
                <ChatMessageList
                    loading={
                        loading.createRoomChat ||
                        loading.getMessages ||
                        loading.sendMessage
                    }
                    refetch={() => user && getAllMessages(user?.id, item?.id)}
                    messages={messages}
                />
            </View>
            <View style={{ marginBottom: hp(2.7) }} className="pt-2">
                <TextInput
                    control={control}
                    name="message"
                    placeholder="Type your message "
                    icon={
                        <TouchableOpacity
                            onPress={() =>
                                handleSubmit(() =>
                                    handleSendMessage(
                                        getValues() as {
                                            message: string
                                        }
                                    )
                                )()
                            }
                        >
                            <Feather
                                name="send"
                                size={24}
                                color="rgb(115 115 115)"
                            />
                        </TouchableOpacity>
                    }
                    positionIcon="right"
                />
            </View>
        </KeyboardAvoidingView>
    )
}
