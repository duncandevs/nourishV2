import { supabase } from "../../clients/supabase";
import {  
    getDateRangeFromToday, 
} from '../../utility/dates';


const getExerciseLogsByDate = ({ logs, date }: {logs: [], date: string}) => 
    logs?.filter(log => log?.date?.startsWith(date))

const fetchAllExerciseLogs = async ({ userId }:{userId: string}) => {
    return supabase
        .from('exerciseLog')
        .select('*, exercise(name)')
        .eq('user_id', userId)
};

type FetchExerciseLogsByDateRangeParams = {
    userId: string, 
    startOfPeriod: string, 
    endOfPeriod: string,
}
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

export default {
    fetchAllExerciseLogs,
    fetchWeeklyExerciseLogs,
    getExerciseLogsByDate,
};