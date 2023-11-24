import { supabase } from "../../clients/supabase";
import { ExerciseSchedule } from './types';

type FetchUserExerciseSchedulesParams = {
    userId: string, 
};

export type CreateExerciseScheduleParams = Omit<ExerciseSchedule, 'user_id'>;
export type UpdateExerciseScheduleParams = Omit<ExerciseSchedule, 'user_id'>;

const fetchUserExerciseSchedules = async ({ userId }: FetchUserExerciseSchedulesParams) => {
        return supabase
            .from('exerciseSchedule')
            .select('*, exercise(*)')
            .eq('user_id', userId)
};

const createExerciseSchedule = async ({ 
    exerciseScheduleParams
}: {exerciseScheduleParams: ExerciseSchedule }) => {
    return supabase
        .from('exerciseSchedule')
        .insert({
            ...exerciseScheduleParams
        })
};

const updateExerciseSchedule = async ({ 
    updateExerciseScheduleParams,
}:  {updateExerciseScheduleParams:  ExerciseSchedule }) => {
    return supabase
        .from('exerciseSchedule')
        .update({
            ...updateExerciseScheduleParams
        })
        .eq('user_id', updateExerciseScheduleParams?.user_id)
        .eq('exercise_id', updateExerciseScheduleParams?.exercise_id)

};

export default {
    fetchUserExerciseSchedules,
    createExerciseSchedule,
    updateExerciseSchedule,
};