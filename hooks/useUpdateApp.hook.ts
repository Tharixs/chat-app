import * as Updates from 'expo-updates'
import { useEffect } from 'react'
export const useUpdateApp = () => {
    const { isUpdateAvailable, isUpdatePending } = Updates.useUpdates()
    useEffect(() => {
        if (isUpdatePending) {
            Updates.reloadAsync()
        }
    }, [isUpdatePending])

    const showButtonUpdate = isUpdateAvailable

    return { showButtonUpdate }
}
