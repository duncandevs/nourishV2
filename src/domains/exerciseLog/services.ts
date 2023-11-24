import { supabase } from "../../clients/supabase";
import {  
    getDateRangeFromToday, 
} from '../../utility/dates';
import { ExerciseLog } from './type'

type FetchExerciseLogsByDateRangeParams = {
    userId: string, 
    startOfPeriod: string, 
    endOfPeriod: string,
}

export type CreateExerciseLogParams = Omit<ExerciseLog, 'user_id'>

const getExerciseLogsByDate = ({ logs, date }: {logs: [], date: string}) => 
    logs?.filter(log => log?.date?.startsWith(date)) || [];

const fetchAllExerciseLogs = async ({ userId }:{userId: string}) => {
    return supabase
        .from('exerciseLog')
        .select('*, exercise(name)')
        .eq('user_id', userId)
};

const fetchExerciseLogsByDateRange = async ({ userId, startOfPeriod, endOfPeriod }: FetchExerciseLogsByDateRangeParams) => {
        return supabase
            .from('exerciseLog')
            .select('*, exercise(*)')
            .gte('date', startOfPeriod)
            .lte('date', endOfPeriod)
            .eq('user_id', userId)
            .order('date', {ascending: false});
};

const fetchWeeklyExerciseLogs = async ({ userId }: {userId: string}) => {
    const { startOfPeriod, endOfPeriod } = getDateRangeFromToday(7);
    return fetchExerciseLogsByDateRange({ userId, startOfPeriod, endOfPeriod});
};

const createExerciseLog = async ({ exerciseLogParams }: 
    {exerciseLogParams: ExerciseLog}) => {
        return supabase
            .from("exerciseLog")
            .insert({...exerciseLogParams})
    }

export default {
    fetchAllExerciseLogs,
    fetchWeeklyExerciseLogs,
    getExerciseLogsByDate,
    createExerciseLog,
};