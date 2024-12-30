import { useEffect, useState } from 'react'
import { Audio } from 'expo-av'

export const useAudio = () => {
    const [sound, setSound] = useState<Audio.Sound>()
    const [recording, setRecording] = useState<Audio.Recording>()
    const [permissionResponse, requestPermission] = Audio.usePermissions()
    const [recordingUri, setRecordingUri] = useState<
        string | null | undefined
    >()
    const [recordingDuration, setRecordingDuration] = useState(0)

    const startRecording = async () => {
        try {
            if (permissionResponse?.status !== 'granted') {
                console.log('Requesting permission ...')
                await requestPermission()
            }
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            })
            console.log('start recording ...')
            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            )
            setRecording(recording)
            console.log('recording started ...')
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    async function stopRecording() {
        console.log('Stopping recording..')
        setRecording(undefined)
        await recording?.stopAndUnloadAsync()
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
        })
        const uri = recording?.getURI()
        setRecordingUri(uri)
        console.log('Recording stopped and stored at', uri)
    }

    const soundPlayer = async (audioUrl: string) => {
        const { sound } = await Audio.Sound.createAsync({ uri: audioUrl })
        setSound(sound)
        await sound.playAsync()
    }

    useEffect(() => {
        let intervalId: string | number | NodeJS.Timeout | undefined
        const updateRecordingTime = async () => {
            if (recording) {
                const status = await recording.getStatusAsync()
                setRecordingDuration(status.durationMillis)
            }
        }

        if (recording) {
            intervalId = setInterval(updateRecordingTime, 1000)
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId)
                setRecordingDuration(0)
            }
        }
    }, [recording])

    return {
        recording,
        startRecording,
        soundPlayer,
        stopRecording,
        recordingDuration,
        sound,
        recordingUri,
    }
}
