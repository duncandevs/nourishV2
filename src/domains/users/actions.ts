import {produce} from 'immer';
import UserService from "./services";
import { SupabaseAuthArgs } from '../../clients/supabaseClient';
import { ActionParams } from '../types';

export const handleLoginAction = ({ set }: ActionParams): Function => 
     async ({ email, password }: SupabaseAuthArgs) => {
        // set is loading to true
        set(produce((state: any) => { 
            state.user.isLoading = true 
        }));

        // attempt login
        const { data: authData, error: authError } = await UserService.handleLogin({email, password});
        set(produce((state: any) => {
            state.user.error = authError
            if(!authError && authData) state.user.session = authData.session
        }));

        // if login is successful fetch user 
        if(!authError && authData) {
            const { data: userData, error: userError } = await UserService.handleFetchUser({ userId: authData.session.user.id})
            set(produce((state: any) => {
                state.user.error = userError
                if(!userError && userData) state.user.data = userData
            }));
        };

        // set isLoading to false
        set(produce((state: any) => { 
            state.user.isLoading = false
        }));
    };