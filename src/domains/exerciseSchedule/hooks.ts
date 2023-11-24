import { useEffect, useState } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useUser } from '../users/hooks';
import { ExerciseSchedule } from './types';
import ExerciseScheduleService, { CreateExerciseScheduleParams, UpdateExerciseScheduleParams } from './services';

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
    const fetchExerciseSchedules = async () => {
        const response = await ExerciseScheduleService.fetchUserExerciseSchedules({userId: user.id });
        return response.data;
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

    return { 
        data,
        getSchedulesByDay,
        error: isError ? error : null,
        isLoading,
        createExerciseSchedule,
        createExerciseScheduleError,
        updateExerciseSchedule,
        updateExerciseScheduleError,
    };
};

export const useSelectedExerciseSchedule = (selectedDay?: string) => {
    const { getSchedulesByDay } = useExerciseSchedules();
    const [selectedExerciseSchedule, setSelectedExerciseSchedule] = useState([]);
    
    useEffect(()=>{
        if(selectedDay) setSelectedExerciseSchedule(
            getSchedulesByDay(selectedDay)
        )
    }, [selectedDay]);

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

    const createExerciseSchedule = async (newExerciseScheduleData: CreateExerciseScheduleParams) => {
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
            console.log(updateExerciseScheduleParams)
            return ExerciseScheduleService.updateExerciseSchedule({ updateExerciseScheduleParams })
        },
        {
            onSuccess: () => {
                // Invalidate and refetch exercise schedules after a successful creation
                queryClient.invalidateQueries(ExerciseLogKeys.schedules);
            }
        }
    );

    const updateExerciseSchedule = async (newExerciseScheduleData: UpdateExerciseScheduleParams) => {
        // Here you can add logic before creating the schedule, if needed
        const updateExerciseScheduleParams: ExerciseSchedule  = {
            ...newExerciseScheduleData,
            user_id: user?.id,
        };
        await mutation(updateExerciseScheduleParams);
    };

    return { updateExerciseSchedule, status, error };
};



