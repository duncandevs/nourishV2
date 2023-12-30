import {produce} from 'immer';
import FoodLogService from "./services";
import { FoodLog } from "./types";
import { ActionParams } from '../types';

const fetchFoodLogsAction = ({ set }: ActionParams) => 
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

const deleteFoodLogAction = ({ set, get }: ActionParams) =>
    async ({ foodLogId }: { foodLogId: string}) => {
        set(produce((draft: any)  => {
            draft.foodLogs.data = draft.foodLogs.data.filter((item: FoodLog) => item.id !== foodLogId);
            FoodLogService.deleteFoodLog({ foodLogId })
        }));
    };

const setNewFoodLogAction = ({ set }: ActionParams) =>
    async({ foodLog }: {foodLog: FoodLog }) => {
        set(produce((state: any) => {
            state.foodLogs.data = [foodLog, ...state.foodLogs.data]
        }))
    };

export default {
    fetchFoodLogsAction,
    deleteFoodLogAction,
    setNewFoodLogAction,
}