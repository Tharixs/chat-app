export interface User {
    createdAt: CreatedAt
    email: string
    id: string
    imageUrl: string
    name: string
}

interface CreatedAt {
    nanoseconds: number
    seconds: number
}
