import { supabase } from "../../clients/supabase";
import { ExerciseSchedule } from './types';

type FetchUserExerciseSchedulesParams = {
    userId: string, 
};

export type ExerciseScheduleParams = Omit<ExerciseSchedule, 'user_id'>;

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


const createOrUpdateExerciseSchedule = async ({ exerciseScheduleParams }: {exerciseScheduleParams: ExerciseSchedule }) => {
    // Fetch existing schedules for the user
    const { data: existingSchedules, error } = await fetchUserExerciseSchedules({ userId: exerciseScheduleParams.user_id });

    if (error) {
        throw Error(error.message);
    }

    // Check if a schedule with the given exercise_id exists
    const existingSchedule = existingSchedules.find(schedule => schedule.exercise_id === exerciseScheduleParams.exercise_id);

    // If it exists, update it; otherwise, create a new schedule
    if (existingSchedule) {
        const updateResponse = await updateExerciseSchedule({ updateExerciseScheduleParams: exerciseScheduleParams });
        return updateResponse;
    } else {
        const createResponse = await createExerciseSchedule({ exerciseScheduleParams });
        return createResponse;
    }
};

export default {
    fetchUserExerciseSchedules,
    createExerciseSchedule,
    updateExerciseSchedule,
    createOrUpdateExerciseSchedule
};