import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import TextInput from '@/components/TextInput'
import { Ionicons } from '@expo/vector-icons'

type AuthLoginFormTypeProps = {
    control: any
    formState: any
}
const AuthLoginForm: React.FC<AuthLoginFormTypeProps> = ({
    control,
    formState,
}) => {
    return (
        <View className="gap-4">
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
            <View className="gap-3">
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
                    errorMessage={String(
                        formState.errors.password?.message ?? ''
                    )}
                />
            </View>
            <Link href={'/forgotPassword'} asChild>
                <Text
                    style={{ fontSize: hp(1.8) }}
                    className="font-semibold text-right text-neutral-500"
                >
                    Forgot Password?
                </Text>
            </Link>
        </View>
    )
}
export default AuthLoginForm
