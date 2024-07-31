// date formater and time formater
export const dateFormater = (date: string) => {
    const newDate = new Date(date)
    const day = newDate.getDate()
    const month = newDate.getMonth() + 1
    const year = newDate.getFullYear()
    return `${day}/${month}/${year}`
}

export const timeFormater = (date: string) => {
    const newDate = new Date(date)
    const hours = newDate.getHours()
    const minutes = newDate.getMinutes()
    return `${hours}:${minutes}`
}
