import { useAuthContext } from '@/context/authContext'
import { useModalActionContext } from '@/context/modalContext'
import { manageFollowUser } from '@/services/userService'
import throttle from '@/utils/throttle'
import { router } from 'expo-router'
import React, { useMemo } from 'react'
import SearchUserItemView from './SearchUserItemView'

const SearchUserItem = ({
    item,
    noBorder,
}: {
    item: User
    noBorder: boolean
}) => {
    const { openModal } = useModalActionContext()
    const { user } = useAuthContext()
    const isUser = user?.id === item?.id
    const isFollowing =
        user && item?.followers?.find((follower) => follower?.id === user?.id)

    const handleChatPress = throttle(() => {
        router.push({
            pathname: '/chat',
            params: { item: JSON.stringify(item ?? '{}') as any },
        })
    }, 1000)

    const handleFollowAction = throttle(
        async (state: 'follow' | 'unfollow') => {
            try {
                if (!user || !item) return
                await manageFollowUser(user?.id, item?.id, state)
            } catch (error) {
                openModal({
                    body: (error as Error).message,
                    title: 'Follow Failed',
                    typeModal: 'fail',
                })
            }
        },
        1000
    )

    const handleNameOfFollower = useMemo(() => {
        if (item?.followers?.length) {
            if (isFollowing) {
                return 'Followed by you'
            } else {
                const filteredFollowers = item?.followers?.filter(
                    (follower) =>
                        follower?.id !== user?.id &&
                        user?.followings?.some((f) => f?.id === follower?.id)
                )

                if (filteredFollowers?.length > 0) {
                    if (filteredFollowers?.length > 2) {
                        return `Followed by ${filteredFollowers?.[0]?.userName}, ${filteredFollowers?.[1]?.userName}, ...`
                    } else {
                        return `Followed by ${filteredFollowers?.map((f) => f?.userName).join(', ')}`
                    }
                } else {
                    return 'Followed by others'
                }
            }
        } else {
            return 'None of your followers '
        }
    }, [isFollowing, item?.followers, user?.followings, user?.id])

    return (
        <SearchUserItemView
            item={item}
            isUser={isUser}
            noBorder={noBorder}
            isFollowing={isFollowing ? true : false}
            handleNavigate={() =>
                !isUser ? handleChatPress() : router?.push('/profile')
            }
            handleActionFollow={() =>
                handleFollowAction(isFollowing ? 'unfollow' : 'follow')
            }
            handleNameOfFollower={handleNameOfFollower}
        />
    )
}

export default SearchUserItem
