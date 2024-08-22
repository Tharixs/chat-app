import React, { ReactNode, createContext, useContext, useReducer } from 'react'

import {
    ActionModalType,
    InitialStateModal,
    InitialStateModalType,
    modalReducer,
} from '@/reducer/modalReducer'

type ModalActionContextProps = {
    openModal({
        body,
        title,
        typeModal,
    }: {
        body: string
        title: string
        typeModal: 'fail' | 'success'
    }): void
    closeModal(): void
}
const ModalStateContext = createContext<InitialStateModalType | undefined>(
    undefined
)
const ModalActionContext = createContext<
    React.Dispatch<ActionModalType> | undefined
>(undefined)

type ModalContextProviderProps = {
    children: ReactNode
}

export const ModalContextProvider = ({
    children,
}: ModalContextProviderProps) => {
    const [state, dispatch] = useReducer(modalReducer, InitialStateModal)
    return (
        <ModalStateContext.Provider value={state}>
            <ModalActionContext.Provider value={dispatch}>
                {children}
            </ModalActionContext.Provider>
        </ModalStateContext.Provider>
    )
}

export const useModalStateContext = (): InitialStateModalType => {
    const value = useContext(ModalStateContext)
    if (!value) {
        throw new Error(
            'useModalState must be used within an ModalContextProvider'
        )
    }
    return value
}

export const useModalActionContext = (): ModalActionContextProps => {
    const dispatch = useContext(ModalActionContext)
    if (!dispatch) {
        throw new Error(
            'useModalAction must be used within an ModalContextProvider'
        )
    }
    return {
        openModal({
            body,
            title,
            typeModal,
        }: {
            body: string
            title: string
            typeModal: 'fail' | 'success'
        }) {
            dispatch({ body, title, type: 'SET_OPEN', typeModal })
        },
        closeModal() {
            dispatch({ type: 'SET_CLOSE' })
        },
    }
}
