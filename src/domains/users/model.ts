import { User } from "./types"
import { handleLoginAction } from './actions'

type UserModel= {
    user: User,
    handleLoginAction: Function
};

// auth model & actions
export const createUserModel = (set: Function, get: Function) => ({
    user: {
        session: null,
        error: null, 
        isLoading: false, 
        data: null,
        handleLogin: handleLoginAction({ set }),
    },
});

