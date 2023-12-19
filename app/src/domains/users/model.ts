import { User } from "./types"
import Actions from './actions'

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
        handleLoginSuccess: Actions.handleLoginSuccessAction({ set }),
        handleLogOut: Actions.handleLogOutAction({ set }),
        updateUserState: Actions.updateUserStateAction({ set, get }),
    },
});

