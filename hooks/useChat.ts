import { dateFormater, timeFormater } from '@/utils/dateFormater'

export const useChatHook = () => {
    const handleDisplayLastDateTime = (date: Date) => {
        if (typeof date === 'undefined') return 'loading...'
        if (date.getDate() === new Date().getDate()) {
            return timeFormater(String(date))
        } else {
            return dateFormater(String(date))
        }
    }

    return { handleDisplayLastDateTime }
}
