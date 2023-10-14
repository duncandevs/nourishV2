import { CreateFoodArgs } from "./types";
import { supabase } from '../../../lib/supabase';
import { CreateFoodResponse } from "./types";

export const createFood = async ({ food }: CreateFoodArgs): CreateFoodResponse => {
    try {
        const { data, error } = await supabase
            .from('food')
            .insert({...food})
            .select('*')
            .single()
        if(error) return {error: error.message, data: null};
        return { data, error };
    } catch (error) {
        return { error, data: null }
    };
};

export default {
    createFood
}