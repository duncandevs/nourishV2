export type ExerciseMeasurement = 'time' | 'reps';
export type ExerciseCategory = 'arms' | 'legs' | 'core' | 'cardio' | 'shoulders' | 'back' | 'chest' | 'stretch' | 'sport' | 'pilates'
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
