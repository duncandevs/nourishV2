type UserModel = {
    name?: string;
    created_at: string,
    id: string,
    updated_at?: string,
    calorie_target?: number
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

export type UpdateUserProfileArgs = {
    userId:string | undefined | null, 
    name?: string, 
    email?:string, 
    password?:string
};

export type UpdateUserCalorieTargetArgs = {
    userId: string;
    target: number;
}