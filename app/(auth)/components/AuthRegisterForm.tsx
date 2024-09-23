import { View } from 'react-native'
import React from 'react'
import TextInput from '@/components/TextInput'
import { Ionicons } from '@expo/vector-icons'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import { Control, FormState } from 'react-hook-form'
type AuthRegisterFormTypeProps = {
    formState: FormState<{
        [x: string]: any
    }>
    control: Control<
        {
            [x: string]: any
        },
        any
    >
}
const AuthRegisterForm: React.FC<AuthRegisterFormTypeProps> = ({
    control,
    formState,
}) => {
    return (
        <View className="gap-4">
            <TextInput
                icon={
                    <Ionicons
                        name="person-outline"
                        size={hp(3.5)}
                        color={'rgb(115 115 115)'}
                        style={{ marginRight: wp(2) }}
                    />
                }
                control={control}
                name="userName"
                placeholder="User Name"
                errorMessage={String(formState.errors.userName?.message ?? '')}
            />
            <TextInput
                icon={
                    <Ionicons
                        name="mail-outline"
                        size={hp(3.5)}
                        color={'rgb(115 115 115)'}
                        style={{ marginRight: wp(2) }}
                    />
                }
                control={control}
                name="email"
                placeholder="Email Address"
                errorMessage={String(formState.errors.email?.message ?? '')}
            />
            <TextInput
                icon={
                    <Ionicons
                        name="lock-closed-outline"
                        size={hp(3.5)}
                        color={'rgb(115 115 115)'}
                        style={{ marginRight: wp(2) }}
                    />
                }
                control={control}
                name="password"
                placeholder="Password"
                secureTextEntry={true}
                errorMessage={String(formState.errors.password?.message ?? '')}
            />
        </View>
    )
}

export default AuthRegisterForm
