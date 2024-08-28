import React from 'react'
import { useAuthContext } from '@/context/authContext'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as Updates from 'expo-updates'
import { yupResolver } from '@hookform/resolvers/yup'
import { router } from 'expo-router'
import { useImagePicker } from '@/hooks/useImagePicker'
import { useUpdateApp } from '@/hooks/useUpdateApp.hook'
import { useModalActionContext } from '@/context/modalContext'
import ProfileView from './ProfileView'
import { userUpdateProfileSchema } from '../schemas/userUpdateProfile.schema'

const Profile = () => {
    const { user, handleUpdateUserProfile, refetchUser } = useAuthContext()
    const { pickImage, imageRes, image } = useImagePicker()
    const { showButtonUpdate } = useUpdateApp()
    const { control, handleSubmit, getValues, formState } = useForm({
        resolver: yupResolver(userUpdateProfileSchema),
    })
    const { openModal } = useModalActionContext()
    const handleUpdateProfile: SubmitHandler<Partial<User>> = async (
        data: Partial<User>
    ) => {
        try {
            await handleUpdateUserProfile(user?.id!, data.userName, imageRes)
            await refetchUser()
            openModal({
                typeModal: 'success',
                title: 'Update Success !',
                body: 'You have successfully updated your profile',
            })
            router.replace('home')
        } catch (error) {
            console.error('error update user profile', error)
            openModal({
                typeModal: 'fail',
                title: 'Update Failed !',
                body: (error as Error).message,
            })
        }
    }

    return (
        <ProfileView
            control={control}
            formState={formState}
            onSubmit={() =>
                handleSubmit(() => handleUpdateProfile(getValues()))()
            }
            pickImage={pickImage}
            user={user}
            image={image}
            onUpdate={() =>
                showButtonUpdate
                    ? Updates.fetchUpdateAsync()
                    : Updates.checkForUpdateAsync()
            }
            updateLabel={
                showButtonUpdate ? `Update Available` : `Check For Updates`
            }
        />
    )
}

export default Profile
