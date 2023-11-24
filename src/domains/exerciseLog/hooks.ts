import { useQuery } from 'react-query';
import { useUser } from '../users/hooks';
import ExerciseLogService from './services';

export const ExerciseLogKeys = {
    all: 'exerciseLogs',
    weekly: 'weeklyExerciseLogs'
};

export const useAllExerciseLogs = () => {
    const user = useUser();
    const fetchLogs = async () => {
        const response = await ExerciseLogService.fetchAllExerciseLogs({userId: user.id });
        return response.data;
    };

    const { data, error, isError, isLoading } = useQuery(
        [ExerciseLogKeys.all], 
        fetchLogs, 
        { enabled: !!user?.id }
    );

    return {
        data,
        error: isError ? error : null,
        isLoading
    };
};

export const useWeeklyExerciseLogs = () => {
    const user = useUser();
    const fetchWeeklyLogs = async () => {
        const response = await ExerciseLogService.fetchWeeklyExerciseLogs({userId: user.id });
        return response.data;
    };

    const { data, error, isLoading, isError } = useQuery(
        [ExerciseLogKeys.weekly],
        fetchWeeklyLogs,
        {enabled: !!user?.id}
    );

    const getWeeklyLogsByDate = (date: string ) => ExerciseLogService.getExerciseLogsByDate({ logs: data, date})

    return { 
        data,
        error: isError ? error : null,
        isLoading,
        getWeeklyLogsByDate,
    };
}


