import { supabase } from '../../../lib/supabase';
import { getEndOfDayDate, getTodaysDate, getDateRangeFromToday } from '../../utility/dates';
import { FoodMealType } from '../food/types';
import { FetchMethod } from '../types';
import { FetchFoodLogArgs, CreateFoodLogArgs, Macros, FoodLog } from './types';

/*
    BEWARE TIME COMPLEXITY WITH LOOK UPS IF NEED TO STORE DATA PREFER OBJECT TO ARRAY
        IE: {
            "DATE-1": <RECORD>,
            "DATE-2": <RECORD>,
            ...
        } 
        **instead of 
        [<RECORD>, <RECORD>....]
*/

// Add service method to Get the most recent
const fetchFoodLogByUserId = async ({userId }: FetchFoodLogArgs): FetchMethod => {
    try {
        const { data, error } = await supabase
            .from('foodLogs')
            .select('*, food(*)')
            .eq('user_id', userId)
            .order('date', {ascending: false});

        if(error) return { error, data: null };
        return { data, error: null};
    } catch (error) {
        return { error: 'Fetch Food Log Error!', data: null };
    };
};

const fetchTodaysFoodLogsByUserId = async ({ userId }: FetchFoodLogArgs): FetchMethod => {
    try {
        const startOfDay = getTodaysDate();
        const endOfDay = getEndOfDayDate();

        const { data, error } = await supabase
            .from('foodLogs')
            .select('*, food(*)')
            .gte('date', startOfDay)
            .lte('date', endOfDay)
            .eq('user_id', userId)
            .order('date', {ascending: false});

        if(error) return { data: null, error }

        return { data, error }
    } catch (error) {
        return { error, data: null }
    };
};

/*
    TODO: ADD FORMATTING METHOD TO PUSH RECORDS INTO AN OBJECT { [DATE]: <RECORD>  } FOR QUICKER LOOK UPS BY DATE
*/

const fetchWeeklyFoodLogsByUserId = async ({ userId }: FetchFoodLogArgs): FetchMethod => {
    try {
        const { startOfPeriod, endOfPeriod } = getDateRangeFromToday(7)
        const { data, error } = await supabase
            .from('foodLogs')
            .select('*, food(*)')
            .gte('date', startOfPeriod)
            .lte('date', endOfPeriod)
            .eq('user_id', userId)
            .order('date', {ascending: false});

        if(error) return { data: null, error }

        return { data, error }
    } catch (error) {
        return { error, data: null }
    };
};

const createFoodLog = async ({ foodLog }: CreateFoodLogArgs ): FetchMethod => {
    try {
        const { data, error } = await supabase
            .from('foodLogs')
            .insert({...foodLog})
            .select('*, food(*)')
            .single()
        if(error) return { data: null, error}
        return {data, error: null}
    } catch (error) {
        return { data: null, error};
    };
};

const getCalorieCount = ({ foodLogs, date }: {foodLogs: FoodLog[], date: string}): number => {
    // Filter foodLogs for the given date
    const logsForTheDate = foodLogs?.filter(log => log.date.startsWith(date));

    // Sum up the calories for the filtered foodLogs
    const totalCalories = logsForTheDate?.reduce((sum, log) => log.food?.calories ? sum + log.food.calories : sum, 0);
    return totalCalories;
};

const getFoodLogsByDate = ({ foodLogs, date }: {foodLogs: FoodLog[], date: string}): FoodLog[] => {
    return foodLogs?.filter(log => {
        return log.date.startsWith(date)
    });
};

const getMacrosByDate = ({ foodLogs, date }: {foodLogs: FoodLog[], date: string}): Macros => {
    // Filter foodLogs for the given date
    const logsForTheDate = getFoodLogsByDate({ foodLogs, date });

    // Sum up the calories for the filtered foodLogs
    const calories = logsForTheDate?.reduce((sum, log) => log.food?.calories ? sum + log.food.calories : sum, 0);

    // Sum up the fat macros
    const fat = logsForTheDate?.reduce((sum, log) => log.food?.fat ? sum + log.food.fat : sum, 0);

    // Sum up the protein
    const protein = logsForTheDate?.reduce((sum, log) => log.food?.protein ? sum + log.food.protein : sum, 0);

    // Sum up the carbs
    const carbs = logsForTheDate?.reduce((sum, log) => log.food?.carbs ? sum + log.food.carbs : sum, 0);

    return {
        calories,
        fat,
        protein,
        carbs
    };
};

const getCalorieMealStatsByDate = ({ foodLogs, date }: {foodLogs: FoodLog[], date: string}) => {
    // Filter foodLogs for the given date
    const logsForTheDate = getFoodLogsByDate({ foodLogs, date });

    // Sum up the calories for the filtered foodLogs
    const breakfast = logsForTheDate?.reduce((sum, log) => log.meal_type === 'breakfast' ? sum + log.food.calories : sum, 0);

    // Sum up the fat macros
    const lunch = logsForTheDate?.reduce((sum, log) => log.meal_type === 'lunch' ? sum + log.food.calories : sum, 0);

    // Sum up the protein
    const dinner = logsForTheDate?.reduce((sum, log) => log.meal_type === 'dinner' ? sum + log.food.calories : sum, 0);

    // Sum up the carbs
    const snacks = logsForTheDate?.reduce((sum, log) => log.meal_type === 'snack' ? sum + log.food.calories : sum, 0);

    return {
        breakfast,
        lunch,
        dinner,
        snacks
    };
};

export const getFoodLogsByMealTypeAndDate = ({ foodLogs, date, mealType}: {foodLogs: FoodLog[], date: string, mealType: FoodMealType}) => {
    // Filter foodLogs for the given date
    const meals =  foodLogs?.filter(log => (log.date.startsWith(date) && log.meal_type === mealType));

    if(!meals) return [];
    return meals
};



export default {
    fetchFoodLogByUserId,
    fetchTodaysFoodLogsByUserId,
    fetchWeeklyFoodLogsByUserId,
    createFoodLog,
    getCalorieCount,
    getMacrosByDate,
    getFoodLogsByDate,
    getCalorieMealStatsByDate,
    getFoodLogsByMealTypeAndDate,
};