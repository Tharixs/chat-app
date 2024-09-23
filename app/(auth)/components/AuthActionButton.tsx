import { View } from 'react-native'
import React, { PropsWithChildren } from 'react'
import LotieAnimationIcon from '@/components/LotieAnimationIcon'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Button from '@/components/Button'

type AuthActionButtonTypeProps = {
    formState: any
    reset?: any
    onSubmit: () => void
}
const AuthActionButton: React.FC<
    PropsWithChildren<AuthActionButtonTypeProps>
> = ({ formState, children, onSubmit }) => {
    return (
        <View className="gap-4">
            <View>
                {formState.isSubmitting ? (
                    <View className="justify-center items-center">
                        <LotieAnimationIcon
                            source={require('@/assets/images/loading.json')}
                            size={hp(15.5)}
                        />
                    </View>
                ) : (
                    <Button
                        mode="contained"
                        label="Sign Up"
                        onPress={onSubmit}
                    />
                )}
            </View>
            {children}
        </View>
    )
}

export default AuthActionButton
