import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { forgotPasswordSchema } from '@/schemas/auth/forgotPassword.schema'
import { forgotPassword } from '@/services/authService'
import ForgotPasswordView from './ForgotPasswordView'
import { useModalActionContext } from '@/context/modalContext'

export default function ForgotPassword() {
    const { control, formState, handleSubmit, getValues, reset } = useForm({
        resolver: yupResolver(forgotPasswordSchema),
        delayError: 300,
    })
    const { openModal } = useModalActionContext()

    const onSubmit: SubmitHandler<Partial<SignIn>> = async (data) => {
        try {
            forgotPassword(data.email!)
            openModal({
                body: 'Link has been sent to your email, please check your email',
                title: 'Reset Password',
                typeModal: 'success',
            })
            reset()
        } catch (err) {
            openModal({
                body: (err as Error).message,
                title: 'Reset Password',
                typeModal: 'fail',
            })
        }
    }
    return (
        <ForgotPasswordView
            control={control}
            formState={formState}
            onSubmit={() =>
                handleSubmit(() => onSubmit(getValues() as Partial<SignIn>))()
            }
        />
    )
}
