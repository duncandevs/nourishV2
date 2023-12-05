import { useEffect, useState } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useUser } from '../users/hooks';
import { ExerciseSchedule } from './types';
import ExerciseScheduleService, {  ExerciseScheduleParams } from './services';
import { DAYS_OF_THE_WEEK } from '../../utility';

export const ExerciseScheduleKeys = {
    schedules: 'exerciseSchedules',
    scheduleById: (id: string) => ['exerciseSchedule', id],
};

function _organizeByDaysOfWeek(items) {
    return items?.reduce((acc, item) => {
        DAYS_OF_THE_WEEK.forEach((day: string) => {
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
    const user = useUser();
    const fetchExerciseSchedules = async (): Promise<ExerciseSchedule[]> => {
        const { data } = await ExerciseScheduleService.fetchUserExerciseSchedules({userId: user.id });

        if(data) {
            // TODO: Figure out how to properly cache individual schedules without them going stale
            // data.forEach((schedule: ExerciseSchedule) => {
            //     if(schedule.id) queryClient.setQueryData(
            //         ExerciseScheduleKeys.scheduleById(schedule.id), 
            //         schedule,
            //     );
            // });
            return data
        };

        return [];
    };

    // Set all scheduled data
    const { data, error, isLoading, isError } = useQuery(
        [ExerciseScheduleKeys.schedules],
        fetchExerciseSchedules,
        { enabled: !!user?.id }
    );

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

export const useSelectedExerciseSchedule = (day: string) => {
    const { data } = useExerciseSchedules();
    const [selectedExerciseSchedule, setDailySchedule] = useState([]);
    
    useEffect(()=>{
        setDailySchedule(
            data?.filter((schedule)=> !!schedule[day])
        )
    }, [data, day]);

    return { 
        selectedExerciseSchedule 
    };
};

export const useExerciseScheduleById = (id: string) => {
    const { data: exerciseSchedules } = useExerciseSchedules()

    // Fetch function to get data from the cache
    const fetchScheduleById = () => {
        return exerciseSchedules?.find((schedule)=>schedule.id === id);
    };

    const { data, isLoading, error } = useQuery(
        ExerciseScheduleKeys.scheduleById(id), 
        fetchScheduleById,
    );

    return { data, isLoading, error };
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
                queryClient.invalidateQueries(ExerciseScheduleKeys.schedules);
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
                queryClient.invalidateQueries(ExerciseScheduleKeys.schedules);
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
                queryClient.invalidateQueries(ExerciseScheduleKeys.schedules);
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



