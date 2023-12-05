import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useUser } from '../users/hooks';
import ExerciseLogService, { CreateExerciseLogParams } from './services';
import { ExerciseLog } from './type'

export const ExerciseLogKeys = {
    all: 'exerciseLogs',
    weekly: 'weeklyExerciseLogs'
};

export const useExerciseLogs = () => {
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

    // set create mutation
    const { createExerciseLog, error: createExerciseLogError } = useCreateExerciseLog()

    return {
        data,
        error: isError ? error : null,
        isLoading,
        createExerciseLog,
        createExerciseLogError,
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

    const getWeeklyLogsByDate = (date: string ) => ExerciseLogService.getExerciseLogsByDate({ logs: data, date});

    return { 
        data,
        error: isError ? error : null,
        isLoading,
        getWeeklyLogsByDate,
    };
};


export const useCreateExerciseLog = () => {
    const user = useUser();
    const queryClient = useQueryClient();

    // Define the mutation for creating a new exercise schedule
    const  { mutateAsync: mutation, status, error } = useMutation(
        (exerciseLogParams: ExerciseLog) => ExerciseLogService.createExerciseLog({ exerciseLogParams }),
        {
            onSuccess: () => {
                // Invalidate and refetch exercise logs after a successful creation
                queryClient.invalidateQueries(ExerciseLogKeys.all);
                queryClient.invalidateQueries(ExerciseLogKeys.weekly);
            }
        }
    );

    const createExerciseLog = async (newExerciseLogData: CreateExerciseLogParams) => {
        // Here you can add logic before creating the schedule, if needed
        const exerciseLogParams: ExerciseLog  = {
            ...newExerciseLogData,
            user_id: user?.id,
        }
        await mutation(exerciseLogParams);
    };

    return { createExerciseLog, status, error };
};

export const useExerciseLogFromExercise = ({ exerciseId, date }: {exerciseId: string, date: string}) => {
    const { data: exerciseLogs, error } = useWeeklyExerciseLogs();
    const data: ExerciseLog[] = exerciseLogs?.filter((item)=>{
        return item.exercise_id === exerciseId && item.date.startsWith(date)
    }) || [];
    const isFinished = !!data?.[0];
    console.log('exerciseId - ', exerciseId, date, isFinished);
    return { 
        data: data[0],
        error,
        isFinished
    }
};


