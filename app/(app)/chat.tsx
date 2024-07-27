import { KeyboardAvoidingView, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import TextInput from '@/components/TextInput'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Feather } from '@expo/vector-icons'
import ChatMessageList from '@/components/chat/ChatMessageList'
import { useGlobalSearchParams } from 'expo-router'
import { User } from '@/interfaces/user/user.interfaces'
import throttle from '@/utils/throttle'
import { useRoomChat } from '@/context/roomChatContext'
import { useAuth } from '@/context/authContext'

export default function Chat() {
    const user = useAuth().user as unknown as User
    const item = JSON.parse(useGlobalSearchParams()?.item as string)
    const { control, handleSubmit, getValues, reset } = useForm()
    const { createRoomChatIfNotExists, getAllMessages, sendMessage } =
        useRoomChat()

    useEffect(() => {
        createRoomChatIfNotExists(user?.id, item?.id)
        getAllMessages(user?.id, item?.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSendMessage: SubmitHandler<{ message: string }> = throttle(
        async (data: { message: string }) => {
            await sendMessage(user?.id, item?.id, data.message).then(() => {
                reset()
            })
        },
        1000
    )

    return (
        <KeyboardAvoidingView className="flex-1 bg-white px-4">
            <View className="flex-1">
                <ChatMessageList />
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
