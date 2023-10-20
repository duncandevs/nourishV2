import { CreateFoodArgs } from "./types";
import { supabase } from '../../../lib/supabase';
import { FoodResponse, FetchFoodArgs } from "./types";

export const createFood = async ({ food }: CreateFoodArgs): FoodResponse => {
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

export const createOrGetFood = async ({ food }: CreateFoodArgs): FoodResponse => {
    try {
        // check if there is an existing food option
        const { data: existingFood } = await fetchFoodByName({ foodName: food.name });
        
        // if the food exists return it
        if(existingFood) return { data: existingFood, error: null };

        // if there isn't an existing food create one
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

export const fetchFoodByName = async ({ foodName }: FetchFoodArgs): FoodResponse => {
    try {
        const { data, error } = await supabase
            .from('food')
            .select('*')
            .eq('name', foodName)
            .single()
        if(error) return {error: error.message, data: null};
        return { data, error };
    } catch (error) {
        return { error, data: null }
    };
}

export default {
    createFood,
    fetchFoodByName,
    createOrGetFood,
}