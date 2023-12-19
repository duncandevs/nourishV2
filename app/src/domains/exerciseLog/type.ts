export type ExerciseLog = {
    user_id: string,
    exercise_id: string,
    date: Date, // completition date
    sets?: number | null,
    reps?: number | null,
    time_in_seconds?: number | null,
};