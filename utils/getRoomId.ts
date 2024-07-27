export const getRoomId = (userSender: string, userReceiver: string) => {
    const sortedIds = [userSender, userReceiver].sort()
    return sortedIds.join('-')
}
