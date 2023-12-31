import { SupabaseAuthArgs } from "../../clients/supabaseClient";
import { supabase, supabaseAdminClient } from '../../clients/supabase';
import { FetchMethod } from '../types';
import { SignUpArgs, UpdateUserProfileArgs, UpdateUserCalorieTargetArgs, UserModel } from './types';
import { setItemToAsyncStorage, getItemFromStorage, deleteItemFromStorage } from "../../utility";
import { profilePics } from "../../components";


const storageKeys = {
    user: 'user',
    userProfilePic: 'userProfilePic'
}

const handleAuth = async ({ email, password }: SupabaseAuthArgs): FetchMethod => {
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

const handleLogin = async ({ email, password }: SupabaseAuthArgs) => {
    try {
        const { data: authData, error: authError } = await handleAuth({ email, password });
        if(authError) return {error: authError, data: null};

        const { data: userData, error: userError } = await handleFetchUser({ userId: authData?.session?.user?.id});
        if(userError) throw(userError);
        
        const data = {...userData, ...{email: authData?.user?.email}};
        return { data, error: null };
    } catch (error) {
        return {data: null, error: 'oops something went wrong please try again later!'};
    }
};

const handleSignUp = async ({ email, password, name }: SignUpArgs) => {
    try {
        const { data: signUpData, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name
                },
            },
        });
        return { data: signUpData, error: error?.message };
    } catch (error) {
        return { data:null, error: 'something went wrong with sign up try again later!'}
    }
}


const updateUserProfile = async ({ userId, name, email, password }: UpdateUserProfileArgs) => {
    try {
        if(email) {
            const {error: emailError} = await supabase.auth.updateUser({ email });
            if(emailError) throw(emailError);
        };

        if(password){
            const {error: passwordError} = await supabase.auth.updateUser({ password });
            if(passwordError) throw(passwordError);
        };

        if(name){
            const {error: userError } = await supabase.from('users').update({ name }).eq('id', userId);
            if(userError) throw(userError);
        }
        return { error: '', data: null };
    } catch (error) {
        const errorMsg = 'something went wrong please try again'
        return { error: errorMsg, data: null };
    }
};

// logOutAction
const logOutUser = () => supabase.auth.signOut();

const deleteAccount = async ({ userId }: {userId: string}) => {
    const { error } = await supabaseAdminClient.auth.admin.deleteUser(userId);
    if(!error) logOutUser();
};

const updateUserCalorieTarget = async ({ userId, target }: UpdateUserCalorieTargetArgs) => {
    try {
        const { data, error } = await supabase.from("users").update({ calorie_target: target }).eq('id', userId);
        return { data, error: error?.message}
    } catch (error) {
        return { data: null, error}
    };
};

const getUserFromAuth = async () => {
    try {
        const{data: userData, error } = await supabase.auth.getUser();
        if(error) return {error: error.message, data: null };
        return { data: userData.user, error: null };
    } catch (error) {
        return { error, data: null }; 
    }
};

const setUserToStorage = async (user: UserModel) => {
    setItemToAsyncStorage(storageKeys.user, user);
};

const getUserFromStorage = async () => {
    return getItemFromStorage(storageKeys.user)
};

const deleteUserFromStorage =async () => deleteItemFromStorage(storageKeys.user);

const setProfilePicToStorage = async (pic: string) => {
    setItemToAsyncStorage(storageKeys.userProfilePic, pic);
};

const getProfilePicFromStorage = async () => {
    const storedProfilePic = await getItemFromStorage(storageKeys.userProfilePic);
    return storedProfilePic || profilePics[0];
};



export default {
    handleAuth,
    handleFetchUser,
    handleLogin,
    handleSignUp,
    updateUserProfile,
    updateUserCalorieTarget,
    logOutUser,
    deleteAccount,
    getUserFromAuth,
    getUserFromStorage,
    setUserToStorage,
    deleteUserFromStorage,
    setProfilePicToStorage,
    getProfilePicFromStorage
}