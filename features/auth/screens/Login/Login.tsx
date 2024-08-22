import { signInSchema } from '@/schemas/auth/signIn.schema'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useModalActionContext } from '@/context/modalContext'
import { useAuthContext } from '@/context/authContext'
import LoginView from './LoginView'

const Login = () => {
    const { control, formState, handleSubmit, getValues } = useForm({
        resolver: yupResolver(signInSchema),
        delayError: 300,
    })

    const { handleLogin } = useAuthContext()
    const { openModal } = useModalActionContext()
    const onSubmit: SubmitHandler<SignIn> = async (data) => {
        try {
            await handleLogin(data.email, data.password)
            openModal({
                body: 'You have successfully logged in',
                title: 'Login Success',
                typeModal: 'success',
            })
        } catch (error) {
            openModal({
                body: (error as Error).message,
                title: 'Login Failed',
                typeModal: 'fail',
            })
        }
    }

    return (
        <LoginView
            formState={formState}
            control={control}
            onSubmit={() =>
                handleSubmit(() => onSubmit(getValues() as SignIn))()
            }
        />
    )
}

export default Login
