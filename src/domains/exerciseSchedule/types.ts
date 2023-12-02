import { Exercise } from "../exercise/types";

export type ExerciseSchedule = {
    id?:string,
    user_id: string,
    exercise_id: string,
    exercise?: Exercise,
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
};

export type ExerciseScheduleWithExercise = ExerciseSchedule & {
    exercise: Exercise
};

export type FetchExerciseScheduleResponse = Array<ExerciseScheduleWithExercise>
