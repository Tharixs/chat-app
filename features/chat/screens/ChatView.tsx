import { KeyboardAvoidingView, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import TextInput from '@/components/TextInput'
import { Feather } from '@expo/vector-icons'
import { ChatMessageList } from '@/features/chat/components/ChatMessageList'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

type ChatViewTypeProps = {
    loading: boolean
    getAllMessages: () => void
    messages: FirebaseFirestoreTypes.DocumentData[]
    control: any
    onSubmit: any
}
const ChatView: React.FC<ChatViewTypeProps> = ({
    loading,
    getAllMessages,
    messages,
    control,
    onSubmit,
}) => {
    return (
        <KeyboardAvoidingView className="flex-1 bg-white px-4">
            <View className="flex-1">
                <ChatMessageList
                    loading={loading}
                    refetch={getAllMessages}
                    messages={messages}
                />
            </View>
            <View style={{ marginBottom: hp(2.7) }} className="pt-2">
                <TextInput
                    control={control}
                    name="message"
                    placeholder="Type your message "
                    icon={
                        <TouchableOpacity onPress={onSubmit}>
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
export default ChatView
