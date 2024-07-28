import RoomChatContext from '@/context/roomChatContext'
import { useContext } from 'react'

export const useRoomChat = () => {
    const value = useContext(RoomChatContext)
    if (!value) {
        throw new Error('useRoomChat must be used within an RoomChatProvider')
    }
    return value
}
