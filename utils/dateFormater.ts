// date formater and time formater
export const dateFormater = (date: string) => {
    const listOfMonths = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]
    const newDate = new Date(date)
    const day = newDate.getDate()
    const month = listOfMonths[newDate.getMonth()]
    const year = newDate.getFullYear()
    return `${day} ${month} ${year}`
}

export const timeFormater = (date: string | Date) => {
    const newDate = new Date(date)
    const hours = newDate.getHours()
    const minutes = newDate.getMinutes()
    return `${hours}:${minutes}`
}
