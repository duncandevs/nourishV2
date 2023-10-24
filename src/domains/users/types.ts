type UserModel = {
    name: string
}

export type User = {
    data: UserModel | null,
    isLoading?: boolean,
    error: any
}

export type SignUpArgs = {
    email: string;
    password: string;
    name?: string;
};

export type UpdateUserArgs = {
    userId:string | undefined | null, 
    name?: string, 
    email?:string, 
    password?:string
};