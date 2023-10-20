import {produce} from 'immer';
import FoodLogService from "./services";
import FoodService from "../food/services";
import { CreateFoodLogActionArgs } from "./types";
import { ActionParams } from '../types';

export const fetchFoodLogsAction = ({ set }: ActionParams) => 
    async ({ userId }: {userId: string}) => {
        // set is loading to true
        set(produce((state: any) => { 
            state.foodLogs.isLoading = true 
        }));
        // get the supabase food logs records
        const { data, error } = await FoodLogService.fetchWeeklyFoodLogsByUserId({ userId });
        if(error) {
            set(produce((state: any) => {
                state.foodLogs.error = error
            }))
        } else if(!error && data) {
            set(produce((state: any) => {
                state.foodLogs.data = data
            }))
        };
        // set isLoading to false
        set(produce((state: any) => { 
            state.foodLogs.isLoading = false 
        }));
    };

export const createFoodLogAction = ({ set, get }: ActionParams) =>
    async ({ foodData, mealType, date, quantity }: CreateFoodLogActionArgs) => {
        let foodError = '';
        let food = null;
        // set is loading to true
        set(produce((state: any) => { 
            state.foodLogs.createFoodLogIsLoading = true 
        }));

        if(foodData?.id){
            food = foodData
        }

        if(!foodData?.id){
            // create a new food
            const {data: createFoodData, error: foodError} = await FoodService.createFood({ food: foodData});
            food = createFoodData;
        };
        console.log('food in food log action - ', food)
        if(foodError){
            set(produce((state: any) => {
                state.foodLogs.createFoodLogError = foodError
            }))
        };

        // create new foodLog with new or existing food
        if(food){
            const userId = get().user.data.id
            const foodLogData = {
                food_id: food?.id,
                user_id: userId,
                meal_type: mealType,
                date,
                quantity,
            };

            const { data: foodLog , error: foodLogError} = await FoodLogService.createFoodLog({ foodLog: foodLogData });
            if(foodLogError){
                set(produce((state: any) => {
                    state.foodLogs.createFoodLogError = foodLogError
                }))
            }

            if(foodLog){
                set(produce((state: any) => {
                    state.foodLogs.data = [foodLog, ...state.foodLogs.data]
                    state.foodLogs.createFoodLogError = null
                }))
            };
        };

        // set is loading to false
        set(produce((state: any) => { 
            state.foodLogs.createFoodLogIsLoading = false 
        }));

        return { success: !get().foodLogs.createFoodLogError}
    };