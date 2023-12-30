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

const isExerciseScheduled = (exerciseSchedule: ExerciseSchedule | null) => {
    if(!exerciseSchedule) return false
    // Check if any of the days is true
    const isAnyDayTrue = exerciseSchedule.monday || exerciseSchedule.tuesday || exerciseSchedule.wednesday || 
                         exerciseSchedule.thursday || exerciseSchedule.friday || exerciseSchedule.saturday || exerciseSchedule.sunday;
    // Check if sets or reps is greater than 0
    const isSetsOrRepsTrue = (exerciseSchedule.sets && exerciseSchedule.sets > 0) || (exerciseSchedule.reps && exerciseSchedule.reps > 0);
  
    return isAnyDayTrue || isSetsOrRepsTrue;
};

export default {
    fetchUserExerciseSchedules,
    createExerciseSchedule,
    updateExerciseSchedule,
    createOrUpdateExerciseSchedule,
    isExerciseScheduled
};