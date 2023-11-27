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

    console.log('exercises - ', exercises);
    console.log('error - ', error);

    return {
        exercises,
        error,
        isLoading
    }
}