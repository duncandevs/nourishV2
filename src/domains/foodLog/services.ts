import { supabase } from '../../../lib/supabase';
import { 
    getEndOfDayDate, 
    getTodaysDate, 
    getDateRangeFromToday, 
    getMonthlyRange,
    formatDateFromDateTime 
} from '../../utility/dates';
import { FoodMealType } from '../food/types';
import { FetchMethod } from '../types';
import { 
    FetchFoodLogArgs, 
    CreateFoodLogArgs, 
    Macros, 
    FoodLog, 
    FetchFoodLogByDateRangeArgs, 
    FetchMonthlyFoodLogsByUserIdArgs,
    FoodLogsAvgMacros,
    FoodLogsDateMap 
} from './types';

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
const fetchFoodLogsByDateRange = async ({ userId, startOfPeriod, endOfPeriod }: FetchFoodLogByDateRangeArgs): FetchMethod => {
    try {
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

const fetchWeeklyFoodLogsByUserId = async ({ userId }: FetchFoodLogArgs): FetchMethod => {
    try {
        const { startOfPeriod, endOfPeriod } = getDateRangeFromToday(7);
        const { data, error } = await fetchFoodLogsByDateRange({ userId, startOfPeriod, endOfPeriod});

        if(error) return { data: null, error }

        return { data, error }
    } catch (error) {
        return { error, data: null }
    };
};

const fetchMonthlyFoodLogsByUserId = async ({ userId, month, year }: FetchMonthlyFoodLogsByUserIdArgs) => {
    try {
        const { startOfPeriod, endOfPeriod } = getMonthlyRange(month, year);
        const { data, error } = await fetchFoodLogsByDateRange({ userId, startOfPeriod, endOfPeriod});

        if(error) return { data: null, error }
        return { data, error }
    } catch (error) {
        return { error, data: null }
    };
}

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

const getMacrosByDate = ({
    foodLogs,
    date,
  }: {
    foodLogs: FoodLog[];
    date: string;
  }): Macros => {
    // Filter foodLogs for the given date
    const logsForTheDate = getFoodLogsByDate({ foodLogs, date });

    // Use single reduce to compute all macros
    const macros = logsForTheDate?.reduce(
      (acc, log) => {
        const food = log.food || {};
  
        return {
          calories: acc.calories + (food.calories || 0),
          fat: acc.fat + (food.fat || 0),
          protein: acc.protein + (food.protein || 0),
          carbs: acc.carbs + (food.carbs || 0),
        };
      },
      {
        calories: 0,
        fat: 0,
        protein: 0,
        carbs: 0,
      }
    );
  
    return macros;
  };

  const getCalorieMealStatsByDate = ({
    foodLogs,
    date,
  }: {
    foodLogs: FoodLog[];
    date: string;
  }) => {
    // Filter foodLogs for the given date
    const logsForTheDate = getFoodLogsByDate({ foodLogs, date });
  
    // Use single reduce to compute calorie stats for all meal types
    const mealStats = logsForTheDate?.reduce(
      (acc, log) => {
        const calories = log.food?.calories || 0;
  
        switch (log.meal_type) {
          case 'breakfast':
            return { ...acc, breakfast: acc.breakfast + calories };
          case 'lunch':
            return { ...acc, lunch: acc.lunch + calories };
          case 'dinner':
            return { ...acc, dinner: acc.dinner + calories };
          case 'snack':
            return { ...acc, snacks: acc.snacks + calories };
          default:
            return acc;
        }
      },
      {
        breakfast: 0,
        lunch: 0,
        dinner: 0,
        snacks: 0,
      }
    );
  
    return mealStats;
  };

export const getFoodLogsByMealTypeAndDate = ({ foodLogs, date, mealType}: {foodLogs: FoodLog[], date: string, mealType: FoodMealType}) => {
    // Filter foodLogs for the given date
    const meals =  foodLogs?.filter(log => (log.date.startsWith(date) && log.meal_type === mealType));

    if(!meals) return [];
    return meals
};

export const reduceMonthlyFoodLogsByDates = ({ foodLogs }: { foodLogs: FoodLog[] }): FoodLogsDateMap => {
    const result: FoodLogsDateMap = {}
    return foodLogs.reduce((acc, log) => {
        const date = formatDateFromDateTime(log.date);
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(log);
        return acc;
    }, result);
};

  
export const getAverageMacrosPerDay = ({ foodLogsDateMap }: { foodLogsDateMap: FoodLogsDateMap }): FoodLogsAvgMacros => {
    const result: FoodLogsAvgMacros = {};

    if (foodLogsDateMap) {
        for (let date of Object.keys(foodLogsDateMap)) {
            const dailyFoodLogs = foodLogsDateMap[date];
            const dailyTotal = dailyFoodLogs.reduce((acc, log) => ({
                calories: (acc.calories || 0) + (log.food?.calories || 0),
                fat: (acc.fat || 0) + (log.food?.fat || 0),
                protein: (acc.protein || 0) + (log.food?.protein || 0),
                carbs: (acc.carbs || 0) + (log.food?.carbs || 0)
            }), {
                calories: 0, fat: 0, protein: 0, carbs: 0
            });

            result[date] = {
                calories: Math.round(dailyTotal.calories),
                fat: Math.round((dailyTotal.fat) * 10) / 10,
                protein: Math.round((dailyTotal.protein) * 10) / 10,
                carbs: Math.round((dailyTotal.carbs) * 10) / 10,
            };
        }
    }

    return result;
};
  

export const getAverageMacrosPerMonth = ({ dailyAverages}: {dailyAverages: FoodLogsAvgMacros }): Macros => {
    const monthlyTotal = Object.values(dailyAverages).reduce((acc, dailyMacro) => ({
        calories: acc.calories + dailyMacro.calories,
        fat: acc.fat + dailyMacro.fat,
        protein: acc.protein + dailyMacro.protein,
        carbs: acc.carbs + dailyMacro.carbs
    }), {
        calories: 0, fat: 0, protein: 0, carbs: 0
    });

    const numberOfDays = Object.keys(dailyAverages).length;

    return {
        calories: Math.round(monthlyTotal.calories / numberOfDays),
        fat: Math.round((monthlyTotal.fat / numberOfDays) * 10) / 10,
        protein: Math.round((monthlyTotal.protein / numberOfDays) * 10) / 10,
        carbs: Math.round((monthlyTotal.carbs / numberOfDays) * 10) / 10
    };
};



export default {
    fetchFoodLogByUserId,
    fetchTodaysFoodLogsByUserId,
    fetchWeeklyFoodLogsByUserId,
    fetchMonthlyFoodLogsByUserId,
    createFoodLog,
    getCalorieCount,
    getMacrosByDate,
    getFoodLogsByDate,
    getCalorieMealStatsByDate,
    getFoodLogsByMealTypeAndDate,
    reduceMonthlyFoodLogsByDates,
    getAverageMacrosPerDay,
    getAverageMacrosPerMonth,
};