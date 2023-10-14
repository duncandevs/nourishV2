type UserModel = {
    name: string
}

export type User = {
    data: UserModel | null,
    isLoading?: boolean,
    error: any
}