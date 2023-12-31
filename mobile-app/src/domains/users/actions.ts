import {produce} from 'immer';
import { ActionParams } from '../types';
import { UserModel } from './types';
import UserService from "./services";

type handleLoginArgs = {
   data: UserModel
};


const handleLoginSuccessAction = ({ set }: ActionParams): Function => 
     async ({ data }: handleLoginArgs) => {
        UserService.setUserToStorage(data)
        set(produce((state: any) => { 
            state.user.data = data 
        }));
    };

const handleLogOutAction = ({ set }: ActionParams): Function => 
    async () => {
        set(produce((state: any) => { 
            state = {} 
        }));
    };

const updateUserStateAction = ({ set, get }: ActionParams): Function =>
    async (newProps: UserModel) => {
        set(produce((state: any) => { 
            state.user.data = {...state.user.data, ...{...newProps}} 
        }));
    }

export default {
    handleLoginSuccessAction,
    handleLogOutAction,
    updateUserStateAction,
}