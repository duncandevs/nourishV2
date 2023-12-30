import { supabase } from './supabase';

export type SupabaseAuthArgs = {
    email: string,
    password: string
};

type SupabaseSignUpArgs = SupabaseAuthArgs & {
    // name: string
};

const signInWithPassword = async (args: SupabaseAuthArgs) => await supabase.auth.signInWithPassword(args);
const signUp = async (args: SupabaseSignUpArgs) => await supabase.auth.signUp(args);



export const supabaseClient = {
    signInWithPassword,
    signUp
};
