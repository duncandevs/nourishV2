export type ExerciseMeasurement = 'time' | 'reps';
export type Exercise = {
    created_at: string,
    id: string,
    key: string,
    measurement: ExerciseMeasurement,
    name: string,
};
