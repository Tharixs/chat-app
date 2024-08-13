import React from 'react'
import { View, ViewProps } from 'react-native'
import RNModal from 'react-native-modal'
type ModalSubComponentProps = React.PropsWithChildren<ViewProps>
type ModalProps = React.PropsWithChildren<{
    isVisible: boolean
    onBackdropPress?: () => void
}>

interface ModalComponent extends React.FC<ModalProps> {
    Header: React.FC<ModalSubComponentProps>
    Container: React.FC<ModalSubComponentProps>
    Body: React.FC<ModalSubComponentProps>
    Footer: React.FC<ModalSubComponentProps>
}
const Modal: ModalComponent = ({ isVisible = false, children, ...props }) => {
    return (
        <RNModal
            isVisible={isVisible}
            animationIn={'bounceIn'}
            animationOut={'bounceOut'}
            animationInTiming={1000}
            animationOutTiming={1000}
            backdropTransitionInTiming={800}
            backdropTransitionOutTiming={800}
            onBackdropPress={props.onBackdropPress}
            {...props}
        >
            {children}
        </RNModal>
    )
}

const ModalContainer: React.FC<ModalSubComponentProps> = ({ ...props }) => {
    return (
        <View
            className={`items-cente justify-center bg-white rounded-xl p-2 ${props.className}`}
            {...props}
        >
            {props.children}
        </View>
    )
}

const ModalHeader: React.FC<ModalSubComponentProps> = ({ ...props }) => {
    return <View {...props}>{props.children}</View>
}

const ModalBody: React.FC<ModalSubComponentProps> = ({ ...props }) => {
    return <View {...props}>{props.children}</View>
}

const ModalFooter: React.FC<ModalSubComponentProps> = ({ ...props }) => {
    return <View {...props}>{props.children}</View>
}

Modal.Header = ModalHeader
Modal.Container = ModalContainer
Modal.Body = ModalBody
Modal.Footer = ModalFooter

export default Modal
