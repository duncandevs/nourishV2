import { SupabaseAuthArgs } from "../../clients/supabaseClient";
import { supabase } from '../../../lib/supabase';
import { FetchMethod } from '../types';

const handleLogin = async ({ email, password }: SupabaseAuthArgs): FetchMethod => {
    try {
        const {data, error} = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            return { data: null, error: error.message}
        };
        return { data, error: null };
    } catch (error) {
        return { error: 'Login Failed!', data: null };
    }
};

const handleFetchUser = async ({ userId }: {userId: string}): FetchMethod => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();   
        if (error) {
            return { data: null, error: error.message}
        }
        return { data, error: null}
    } catch (error) {
        return { error: 'Fetch User Error!', data: null};
    }
};

export default {
    handleLogin,
    handleFetchUser
}