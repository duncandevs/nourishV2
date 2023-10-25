import {produce} from 'immer';
import { ActionParams, UserModel } from '../types';

type handleLoginArgs = {
   data: { 
        "created_at": string,
        "email": string,
        "id": string,
        "name": string,
        "updated_at": string | null,
    }
};


export const handleLoginSuccessAction = ({ set }: ActionParams): Function => 
     async ({ data }: handleLoginArgs) => {
        set(produce((state: any) => { 
            state.user.data = data 
        }));
    };

export const handleLogOutAction = ({ set }: ActionParams): Function => 
    async () => {
        set(produce((state: any) => { 
            state = {} 
        }));
    };

export const updateUserStateAction = ({ set, get }: ActionParams): Function =>
    async (newProps: UserModel) => {
        set(produce((state: any) => { 
            state.user.data = {...state.user.data, ...{...newProps}} 
        }));
    }