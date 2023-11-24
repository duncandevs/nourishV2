import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useUser } from '../users/hooks';
import ExerciseScheduleService, { CreateExerciseScheduleParams } from './services';
import { useEffect, useState } from 'react';


export const ExerciseLogKeys = {
    schedules: 'exerciseSchedules',
    dailySchedule: (day: string) => ['dailySchedule', day]
};

function _organizeByDaysOfWeek(items) {
    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    return items?.reduce((acc, item) => {
        daysOfWeek.forEach(day => {
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
    const [selectedExerciseSchedule, setSelectedExerciseSchedule] = useState([]);

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

    return { 
        data,
        getSchedulesByDay,
        selectedExerciseSchedule,
        error: isError ? error : null,
        isLoading,
        createExerciseSchedule,
        createExerciseScheduleError
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

// const newExerciseSchedule = {
//     execise_id: 'c18e16ea-d5e8-46a7-9c3f-a6c8e671b655',
//     time_in_seconds: 2700,
//     monday: null,
//     tuesday: true,
//     wednesday: null,
//     thursday: true,
//     friday: null,
//     saturday: null,
//     sunday: true,
// };

type useCreateExerciseScheduleMutationParams = Omit<CreateExerciseScheduleParams, 'user_id'>;
export const useCreateExerciseSchedule = () => {
    const user = useUser();
    const queryClient = useQueryClient();

    // Define the mutation for creating a new exercise schedule
    const  { mutateAsync: mutation, status, error } = useMutation(
        (exerciseScheduleParams: CreateExerciseScheduleParams) => ExerciseScheduleService.createExerciseSchedule({ exerciseScheduleParams }),
        {
            onSuccess: () => {
                // Invalidate and refetch exercise schedules after a successful creation
                queryClient.invalidateQueries(ExerciseLogKeys.schedules);
            }
        }
    );

    const createExerciseSchedule = async (newExerciseScheduleData: useCreateExerciseScheduleMutationParams) => {
        // Here you can add logic before creating the schedule, if needed
        const exerciseScheduleParams: CreateExerciseScheduleParams  = {
            ...newExerciseScheduleData,
            user_id: user?.id,
        }
        await mutation(exerciseScheduleParams);
    };

    return { createExerciseSchedule, status, error };
};


