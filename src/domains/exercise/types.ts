import { ExerciseSchedule } from "../exerciseSchedule/types";

export type ExerciseMeasurement = 'time' | 'reps';
export type ExerciseCategory = 'arms' | 'legs' | 'core' | 'cardio' | 'shoulders' | 'back' | 'chest' | 'stretch' | 'sport' | 'pilates' | 'all'
export type Exercise = {
    created_at: string,
    id: string,
    key: string,
    measurement: ExerciseMeasurement,
    name: string,
    category: ExerciseCategory,
};

export const ExerciseMeasurements = {
    TIME: 'time',
    REPS: 'reps'
};

export type FormattedExerciseItem = {
    exercise: Exercise;
    exerciseSchedule: ExerciseSchedule | null;
};
