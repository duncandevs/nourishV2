import { useEffect, useState } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useUser } from '../users/hooks';
import { ExerciseSchedule } from './types';
import ExerciseScheduleService, {  ExerciseScheduleParams } from './services';

export const ExerciseLogKeys = {
    schedules: 'exerciseSchedules',
    dailySchedule: (day: string) => ['dailySchedule', day]
};

function _organizeByDaysOfWeek(items) {
    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    return items?.reduce((acc, item) => {
        daysOfWeek.forEach((day: string) => {
            if (item[day]) {
                if (!acc[day]) {
                    acc[day] = [];
                }
                acc[day].push(item);
            }
        });
        return acc;
    }, {});
};


export const useExerciseSchedules = () => {
    const queryClient = useQueryClient();
    const user = useUser();
    const fetchExerciseSchedules = async (): Promise<ExerciseSchedule[]> => {
        const response = await ExerciseScheduleService.fetchUserExerciseSchedules({userId: user.id });
        if(response.data) return response.data
        return [];
    };

    // Set all scheduled data
    const { data, error, isLoading, isError } = useQuery(
        [ExerciseLogKeys.schedules],
        fetchExerciseSchedules,
        {enabled: !!user?.id}
    );

    // Cache individual day schedules
    const schedulesByDay = _organizeByDaysOfWeek(data);
    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    daysOfWeek.forEach((day: string) => {
        queryClient.setQueryData(ExerciseLogKeys.dailySchedule(day), schedulesByDay?.[day] || []);
    });;

    // returns schedule by day
    const getSchedulesByDay = (day: string) => {
        return queryClient.getQueryData(ExerciseLogKeys.dailySchedule(day));
    };

    // set create new exercise schedule mutation
    const { createExerciseSchedule, error: createExerciseScheduleError } = useCreateExerciseSchedule();

    // set update exercise schedule mutation
    const { updateExerciseSchedule, error: updateExerciseScheduleError } = useUpdateExerciseSchedule();

    // set create or update schedule mutation
    const { createOrUpdateExerciseSchedule, error: createOrUpdateExerciseScheduleError} = useCreateOrUpdateExerciseSchedule()

    // get schedule by exerciseId
    const getExerciseScheduleByExerciseId = (exerciseId: string): ExerciseSchedule | null => 
        data?.find((schedule)=>schedule.exercise_id === exerciseId) || null

    return { 
        data,
        getSchedulesByDay,
        error: isError ? error : null,
        isLoading,
        createExerciseSchedule,
        createExerciseScheduleError,
        updateExerciseSchedule,
        updateExerciseScheduleError,
        createOrUpdateExerciseSchedule,
        createOrUpdateExerciseScheduleError,
        getExerciseScheduleByExerciseId
    };
};

export const useSelectedExerciseSchedule = (selectedDayString?: string) => {
    const { getSchedulesByDay } = useExerciseSchedules();
    const [selectedExerciseSchedule, setSelectedExerciseSchedule] = useState([]);
    
    useEffect(()=>{
        if(selectedDayString)  {
            setSelectedExerciseSchedule(
                getSchedulesByDay(selectedDayString)
            );
        }
    }, [selectedDayString]);

    return {
        selectedExerciseSchedule
    }
};

export const useCreateExerciseSchedule = () => {
    const user = useUser();
    const queryClient = useQueryClient();

    // Define the mutation for creating a new exercise schedule
    const  { mutateAsync: mutation, status, error } = useMutation(
        (exerciseScheduleParams: ExerciseSchedule) => ExerciseScheduleService.createExerciseSchedule({ exerciseScheduleParams }),
        {
            onSuccess: () => {
                // Invalidate and refetch exercise schedules after a successful creation
                queryClient.invalidateQueries(ExerciseLogKeys.schedules);
            }
        }
    );

    const createExerciseSchedule = async (newExerciseScheduleData: ExerciseScheduleParams) => {
        // Here you can add logic before creating the schedule, if needed
        const exerciseScheduleParams: ExerciseSchedule  = {
            ...newExerciseScheduleData,
            user_id: user?.id,
        }
        await mutation(exerciseScheduleParams);
    };

    return { createExerciseSchedule, status, error };
};

export const useUpdateExerciseSchedule = () => {
    const user = useUser();
    const queryClient = useQueryClient();

    // Define the mutation for creating a new exercise schedule
    const  { mutateAsync: mutation, status, error } = useMutation(
        (updateExerciseScheduleParams: ExerciseSchedule) => {
            return ExerciseScheduleService.updateExerciseSchedule({ updateExerciseScheduleParams })
        },
        {
            onSuccess: () => {
                // Invalidate and refetch exercise schedules after a successful creation
                queryClient.invalidateQueries(ExerciseLogKeys.schedules);
            }
        }
    );

    const updateExerciseSchedule = async (newExerciseScheduleData: ExerciseScheduleParams) => {
        // Here you can add logic before creating the schedule, if needed
        const updateExerciseScheduleParams: ExerciseSchedule  = {
            ...newExerciseScheduleData,
            user_id: user?.id,
        };
        await mutation(updateExerciseScheduleParams);
    };

    return { updateExerciseSchedule, status, error };
};

export const useCreateOrUpdateExerciseSchedule = () => {
    const user = useUser();
    const queryClient = useQueryClient();

    // Define the mutation for creating a new exercise schedule
    const  { mutateAsync: mutation, status, error } = useMutation(
        (exerciseScheduleParams: ExerciseSchedule) => {
            return ExerciseScheduleService.createOrUpdateExerciseSchedule({ exerciseScheduleParams })
        },
        {
            onSuccess: () => {
                // Invalidate and refetch exercise schedules after a successful creation
                queryClient.invalidateQueries(ExerciseLogKeys.schedules);
            }
        }
    );

    const createOrUpdateExerciseSchedule = async (exerciseScheduleData: ExerciseScheduleParams) => {
        // Here you can add logic before creating the schedule, if needed
        const createOrUpdateExerciseScheduleParams: ExerciseSchedule  = {
            ...exerciseScheduleData,
            user_id: user?.id,
        };
        await mutation(createOrUpdateExerciseScheduleParams);
    };

    return { createOrUpdateExerciseSchedule, status, error };
};



