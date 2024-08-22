import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Modal from '../Modal'
import { Feather } from '@expo/vector-icons'
import LotieAnimationIcon from '../LotieAnimationIcon'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

export const ModalStatus: React.FC<{
    isVisible: boolean
    onClose?: () => void
    status: 'success' | 'fail'
    title?: string
    message?: string
}> = ({ isVisible, onClose, status, title, message }) => {
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            children={
                <Modal.Container>
                    <Modal.Header className="gap-2">
                        {onClose && (
                            <Pressable
                                className="absolute top-2 right-2"
                                onPress={onClose}
                            >
                                <Feather
                                    name="x"
                                    size={24}
                                    color={'rgb(115 115 115)'}
                                />
                            </Pressable>
                        )}
                        <View className="items-center">
                            <LotieAnimationIcon
                                size={hp(25)}
                                source={
                                    status === 'fail'
                                        ? require('@/assets/images/fail.json')
                                        : require('@/assets/images/success.json')
                                }
                            />
                        </View>
                    </Modal.Header>
                    <Modal.Body className="gap-2 mb-4 mx-4">
                        <Text
                            style={{ fontSize: hp(2.7) }}
                            className="text-center font-bold tracking-wider"
                        >
                            {title}
                        </Text>
                        <Text
                            style={{ fontSize: hp(1.8) }}
                            className="font-semibold text-center text-neutral-500"
                        >
                            {message}
                        </Text>
                    </Modal.Body>
                </Modal.Container>
            }
        />
    )
}
