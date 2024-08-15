// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface User {
    createdAt: CreatedAt
    email: string
    id: string
    imageUrl: string
    userName: string
}

interface CreatedAt {
    nanoseconds: number
    seconds: number
}
