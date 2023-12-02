import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
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

export const useTimer = (duration: number) => {
    const [isRunning, setIsRunning] = useState(false);
    const [remainingTime, setRemainingTime] = useState(duration);
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  
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
    }, [duration])
  
    const handleStartStop = () => {
      setIsRunning(!isRunning);
    };
  
    const handleReset = () => {
      setIsRunning(false);
      setRemainingTime(duration);
    };

    return {
        timerId,
        handleStartStop,
        handleReset,
        remainingTime,
        isRunning
    }
};