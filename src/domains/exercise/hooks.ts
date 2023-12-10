import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import ExerciseService from './services';
import ExerciseScheduleService from '../exerciseSchedule/services';
import { useExerciseSchedules } from '../exerciseSchedule/hooks';
import { ExerciseCategory, FormattedExerciseItem, Exercise } from './types';

export const ExerciseKeys = {
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
};

export const useStopWatch = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  
    useEffect(() => {
      if (isRunning) {
        const id = setInterval(() => {
            setElapsedTime((prevTime) => prevTime + 1);
            }, 1000);
            setTimerId(id);
        } else if (!isRunning && timerId) {
            clearInterval(timerId);
        }
        return () => {
           if(timerId) clearInterval(timerId)
        };
    }, [isRunning]);
  
    const handleStartStop = () => {
      setIsRunning(!isRunning);
    };
  
    const handleReset = () => {
      setIsRunning(false);
      setElapsedTime(0);
    };

    const handleResetStart = () => {
        setElapsedTime(0);
        setIsRunning(true);
    };

    const handleStop = () => {
        setIsRunning(false);
    };

    const handleEnd = () => {
        setElapsedTime(0);
        setIsRunning(false);
    }

    return {
        timerId,
        handleStartStop,
        handleReset,
        handleResetStart,
        handleStop,
        handleEnd,
        elapsedTime,
        isRunning,
    }
};

export const useTimer = (duration: number, onFinish?: ()=>void) => {
    const [isRunning, setIsRunning] = useState(false);
    const [remainingTime, setRemainingTime] = useState(duration);
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
    
    const handleOnFinish = () =>{
        if(onFinish) onFinish();
        setIsRunning(false);
    };

    const handleStartStop = () => {
        setIsRunning(!isRunning);
    };
    
    const handleReset = () => {
        setIsRunning(false);
        setRemainingTime(duration);
    };
  
    useEffect(() => {
        if (isRunning) {
            const id = setInterval(() => {
                setRemainingTime((prevTime) => {
                if(prevTime > 0) return prevTime - 1;
                if(timerId) clearInterval(timerId);
                return 0;
            });
            }, 1000);
            if(id) setTimerId(id);
        } else if (!isRunning && timerId) {
            clearInterval(timerId);
        }
        return () => {
            if(timerId) clearInterval(timerId)
        };
    }, [isRunning]);

    useEffect(()=>{
        handleReset()
    }, [duration]);

    useEffect(()=>{
        // handle Done
        if(remainingTime === 0){
            handleOnFinish();
        };
    }, [remainingTime])

    

    return {
        timerId,
        handleStartStop,
        handleReset,
        remainingTime,
        isRunning
    }
};

export const useExerciseItems = () => {
    const { exercises } = useExercises() as {exercises: Exercise[]};
    const [ exerciseItems , setExerciseItems ] = useState<FormattedExerciseItem[]>([]);
    const { data: exerciseSchedules } = useExerciseSchedules();
    const { getExerciseScheduleByExerciseId } = useExerciseSchedules();

    useEffect(() => {
        const exerciseItems = exercises?.map((exercise): FormattedExerciseItem=>({
            exercise: exercise,
            exerciseSchedule: getExerciseScheduleByExerciseId(exercise.id)
        }));
        setExerciseItems(exerciseItems);
    }, [exercises, exerciseSchedules]);

    return { exerciseItems, setExerciseItems }
};

export const useFilteredExerciseItems = () => {
    const { exerciseItems } = useExerciseItems();
    const [ filteredExercises, setFilteredExercises ] = useState<FormattedExerciseItem[]>(exerciseItems);
    const [ selectedCategory, setSelectedCategory ] = useState<ExerciseCategory | null>(null);
    const [ isFilteredShown, setIsFilteredShown ] = useState(false);

    useEffect(()=>{
        setFilteredExercises(exerciseItems);
    }, [exerciseItems]);

    useEffect(() => {
        if(selectedCategory === 'all') {
            setIsFilteredShown(false);
        } else {
            setIsFilteredShown(true);
            setFilteredExercises(
                exerciseItems?.filter(({ exercise }) => {
                    return exercise?.category === selectedCategory
                })
            );
        }
    }, [selectedCategory]);

    const handleSelectCategory = (category: ExerciseCategory) => {
        setSelectedCategory(category);
};

    return { 
        filteredExercises, 
        setFilteredExercises, 
        setIsFilteredShown, 
        isFilteredShown, 
        selectedCategory, 
        setSelectedCategory,
        handleSelectCategory 
    };
};



export const useExerciseSearch = () => {
    const { exerciseItems, setExerciseItems } = useExerciseItems();
    const [ scheduledExercises, setScheduledExercises] = useState<FormattedExerciseItem[]>([]);
    const { filteredExercises, setFilteredExercises, setIsFilteredShown, selectedCategory, setSelectedCategory, isFilteredShown, handleSelectCategory } = useFilteredExerciseItems();
    const { exercises } = useExercises() as {exercises: Exercise[]};
    const [ unscheduledExercises, setUnscheduledExercises ] = useState<FormattedExerciseItem[]>([]);
    const { getExerciseScheduleByExerciseId } = useExerciseSchedules();
    const { data: exerciseSchedules } = useExerciseSchedules();

    useEffect(() => {
        const exerciseItems = exercises?.map((exercise): FormattedExerciseItem=>({
            exercise: exercise,
            exerciseSchedule: getExerciseScheduleByExerciseId(exercise.id)
        }));
        setExerciseItems(exerciseItems);
        setFilteredExercises(exerciseItems);
    }, [exercises, exerciseSchedules]);


    useEffect(() => {
        setScheduledExercises (
            exerciseItems?.filter(({ exerciseSchedule })=>ExerciseScheduleService.isExerciseScheduled(exerciseSchedule))
        );
        setUnscheduledExercises (
            exerciseItems?.filter(({ exerciseSchedule })=>!ExerciseScheduleService.isExerciseScheduled(exerciseSchedule))
        );
    }, [exerciseItems]);


    useEffect(() => {
        setIsFilteredShown(!scheduledExercises?.length);
    }, [scheduledExercises]);

    const handleSearch = (searchTerm: string) => {
        setIsFilteredShown(!!searchTerm || !scheduledExercises?.length);
        const f = exerciseItems?.filter(({ exercise })=>exercise.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
        setFilteredExercises(f);
    };

    return {
        exerciseItems,
        scheduledExercises,
        unscheduledExercises,
        filteredExercises,
        exerciseSchedules,
        selectedCategory,
        setSelectedCategory,
        setFilteredExercises,
        isFilteredShown,
        setIsFilteredShown,
        handleSearch,
        handleSelectCategory,
    }
};
