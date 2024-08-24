import { Text, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { router, useGlobalSearchParams } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import { useAuth } from '@/hooks/useAuth'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { Image } from 'expo-image'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { blurHash } from '@/utils/common'
import ImageModal from 'react-native-image-modal'

export default function ChatHeader() {
    const { item } = useGlobalSearchParams()
    const { handleGetUserById } = useAuth()
    const [userData, setUserData] =
        useState<FirebaseFirestoreTypes.DocumentData>()
    const userId = useMemo(
        () => item && (JSON.parse(item as string).id as string),
        [item]
    ) // GET USER RECEIVER

    useEffect(() => {
        if (userId) {
            const fetchUserById = async () => {
                try {
                    const user = await handleGetUserById(userId)
                    setUserData(user)
                } catch (error) {
                    console.error('Error User', error)
                }
            }

            fetchUserById()
        }
    }, [handleGetUserById, userId])

    return (
        <View className="flex-row items-center gap-4">
            <Feather
                name="arrow-left"
                size={24}
                color="black"
                onPress={() => router.back()}
            />
            <ImageModal
                source={
                    userData?.imageUrl ?? require('@/assets/images/avatar.png')
                }
                style={{
                    height: hp(4.5),
                    borderRadius: 100,
                    aspectRatio: 1,
                    width: hp(4.5),
                }}
                renderImageComponent={({ source, style }) => (
                    <Image
                        source={source}
                        style={style}
                        placeholder={blurHash}
                        contentFit="cover"
                    />
                )}
            />

            <Text
                style={{ fontSize: hp(2) }}
                className="font-semibold text-neutral-800"
            >
                {userData?.userName ?? ''}
            </Text>
        </View>
    )
}
