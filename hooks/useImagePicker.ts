import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { Platform } from 'react-native'

export const useImagePicker = () => {
    const [image, setImage] = useState<string | undefined>()
    const [imageRes, setImageRes] = useState<ImagePicker.ImagePickerAsset>()

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            })
            if (!result.canceled) {
                setImage(
                    Platform.OS === 'ios'
                        ? result.assets[0].uri.replace('file://', '')
                        : result.assets[0].uri
                )
                setImageRes(result.assets[0])
            }
        } catch (error) {
            console.log(error)
            throw new Error('Error picking image')
        }
    }

    return { image, pickImage, imageRes }
}
