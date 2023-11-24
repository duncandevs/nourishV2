import { supabase } from "../../clients/supabase";

type FetchUserExerciseSchedulesParams = {
    userId: string, 
};

export type CreateExerciseScheduleParams = {
    user_id: string,
    exercise_id: string,
    time_in_seconds?: number,
    sets?: number,
    reps?: number,
    monday?: boolean | null,
    tuesday?: boolean | null,
    wednesday?: boolean | null,
    thursday?: boolean | null,
    friday?: boolean | null,
    saturday?: boolean | null,
    sunday?: boolean | null,
}

const fetchUserExerciseSchedules = async ({ userId }: FetchUserExerciseSchedulesParams) => {
        return supabase
            .from('exerciseSchedule')
            .select('*, exercise(*)')
            .eq('user_id', userId)
};

const createExerciseSchedule = async ({ 
    exerciseScheduleParams
}: {exerciseScheduleParams: CreateExerciseScheduleParams }) => {
    return supabase
        .from('exerciseSchedule')
        .insert({
            ...exerciseScheduleParams
        })
}

export default {
    fetchUserExerciseSchedules,
    createExerciseSchedule,
};