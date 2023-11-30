import { useQueryClient, useQuery } from 'react-query';
import ExerciseService from './services';

const ExerciseKeys = {
    all: 'exercises'
}

export const useExercises = () => {
    const fetchExercises = async () => {
        const response = await ExerciseService.fetchExercises();
        return response.data
    };
    // Set all exercise data
    const { data: exercises, error, isLoading } = useQuery(
        [ExerciseKeys.all],
        fetchExercises,
    );

    return {
        exercises,
        error,
        isLoading
    }
}