import { User } from "./types"
import { 
    handleLoginSuccessAction, 
    handleLogOutAction, 
    updateUserStateAction, 
} from './actions'

type UserModel= {
    user: User,
    handleLoginSuccessAction: Function
};

// auth model & actions
export const createUserModel = (set: Function, get: Function) => ({
    user: {
        session: null,
        error: null, 
        isLoading: false, 
        data: null,
        handleLoginSuccess: handleLoginSuccessAction({ set }),
        handleLogOut: handleLogOutAction({ set }),
        updateUserState: updateUserStateAction({ set, get }),
    },
});

