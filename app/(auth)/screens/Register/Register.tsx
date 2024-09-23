import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { register } from '@/services/authService'
import { useModalActionContext } from '@/context/modalContext'
import { yupResolver } from '@hookform/resolvers/yup'
import { router } from 'expo-router'
import RegisterView from './RegisterView'
import { signUpSchema } from '../../schemas/signUp.schema'

const Register = () => {
    const { openModal } = useModalActionContext()
    const { control, formState, handleSubmit, getValues, reset } = useForm({
        resolver: yupResolver(signUpSchema),
        delayError: 300,
    })
    const onSubmit: SubmitHandler<SignUp> = async (data) => {
        try {
            await register(data.email, data.password, data.userName)
            openModal({
                typeModal: 'success',
                title: 'Register Success !',
                body: 'You have successfully registered your account, please login',
            })
            router.push('/signIn')
            reset()
        } catch (err) {
            openModal({
                typeModal: 'fail',
                title: 'Register Failed !',
                body: (err as Error).message,
            })
        }
    }
    return (
        <RegisterView
            control={control}
            formState={formState}
            onSubmit={() =>
                handleSubmit(() => onSubmit(getValues() as SignUp))()
            }
        />
    )
}

export default Register
