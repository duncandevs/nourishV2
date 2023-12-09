import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors, Text } from "../theme";
import { useExerciseScheduleById } from "../domains/exerciseSchedule/hooks";
import { ExerciseSchedule } from "../domains/exerciseSchedule/types";
import { ExerciseMeasurements } from "../domains/exercise/types";
import { useStopWatch, useTimer } from "../domains/exercise/hooks";
import { ExerciseSessionTimer, ExerciseSessionReps, Toast } from "../components";
import { useEffect, useState } from "react";
import { useCreateExerciseLog, useExerciseLogFromExercise } from "../domains/exerciseLog/hooks";
import { useCalendar } from "../domains/calendar/hooks";

import PlayButton from "../../assets/green-play-button.svg";
import ResetButton from "../../assets/green-reset-button.svg";
import StopButton from "../../assets/green-stop-button.svg";
import GreenPlayIcon from "../../assets/green-play-button.svg";
import BlueCheckIcon from "../../assets/blue-check-button.svg";
import SquareCheckIcon from "../../assets/square-check-icon.svg";
import { todaysDateRegular } from "../utility";

type ExerciseSessionScreenProps = {
    navigation: any;
    route: {
        params: {
            id: string
        }
    }
};

type ExerciseTimedSessionProps = {
    duration: number;
    onFinish?: () => void;
    isExerciseFinished?: boolean;
};

type ExerciseRepsSessionProps = {
    sets: number;
    reps: number;
    isExerciseFinished: boolean;
    onFinish?: () => void;
};

export const ExerciseTimedSession = ({ duration, onFinish, isExerciseFinished }: ExerciseTimedSessionProps) => {
    const { handleStartStop, handleReset, remainingTime, isRunning } = useTimer(duration || 0, onFinish);

    useEffect(()=>{
        if(isExerciseFinished) handleReset();
    }, [isExerciseFinished]);

    return <View style={styles.timerContainer}>
            <View>
                <ExerciseSessionTimer timeInSeconds={remainingTime|| 0}/>
            </View>
            <View style={[styles.row, styles.timerActivityButtons]}>
                <TouchableOpacity onPress={handleReset}>
                    <ResetButton /> 
                </TouchableOpacity>
                {!isRunning && <TouchableOpacity onPress={handleStartStop}>
                    <PlayButton />
                </TouchableOpacity>}
                {isRunning && <TouchableOpacity onPress={handleStartStop}>
                    <StopButton />
                </TouchableOpacity>}
            </View>
        </View>
};

export const ExerciseRepsSession = ({ sets, reps, onFinish, isExerciseFinished=false }: ExerciseRepsSessionProps) => {
    const [ isResting, setIsResting ] = useState(false);
    const [ isActive, setIsActive ] = useState(false);
    const { handleResetStart, handleEnd, elapsedTime } = useStopWatch();
    const [ setsData, setSetsData ] = useState(sets);
    const [ isFinished, setIsFinished ] = useState(isExerciseFinished);

    const subtractReps = () => {
        const isReady = !isActive && !isResting
        if(setsData > 0 && !isFinished && !isReady) {
            setSetsData(setsData - 1)
            return setsData - 1;
        };
        return setsData;
    };

    const onActivityPress = () => {
        if(isFinished) {
            handleActivityReset();
            return;
        };

        // handle move from active to resting
        const newActiveState = !isActive;

        if(newActiveState === false){
            let newSets = setsData;
            newSets = subtractReps();
    
            if(newSets === 0) {
                onEndExercise();
                return;
            };
            setIsResting(true);
            setIsActive(newActiveState);
        };

        // moving from resting to active
        if(newActiveState === true){
            setIsResting(false);
            setIsActive(newActiveState);
        };

        handleResetStart();
    };
    

    const onEndExercise = () => {
        setIsActive(false);
        handleEnd();
        setIsFinished(true);
        onFinish && onFinish();
    };

    const handleActivityReset = () => {
        setSetsData(sets);
        setIsFinished(false);
        handleEnd();
        setIsActive(false);
        setIsResting(false);
    };

    const handleResting = () => {
        handleResetStart();
        // setIsActive(false);
        setIsResting(true);
        setIsFinished(false);
    };

    useEffect(()=>{
        if(isFinished) onEndExercise();
    }, [isFinished]);

    return <View style={styles.repsContainer}>
        <ExerciseSessionReps 
            sets={setsData} 
            reps={reps} 
            elapsedTime={elapsedTime} 
            isResting={isResting} 
            isFinished={isFinished}
            isActive={isActive}
        />
        <View style={[styles.row, styles.repsActivityButtons]}>
            <View style={{flexDirection: 'row', gap: 18}}>
                <TouchableOpacity onPress={handleActivityReset}>
                    <ResetButton width={64} height={64} /> 
                </TouchableOpacity>
                {/* <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={handleResting}>
                    <BlueCooldownIcon width={64} height={64}/>
                </TouchableOpacity> */}
            </View>
            <TouchableOpacity onPress={onActivityPress}>
                {isActive && <BlueCheckIcon />}
                {!isActive && <GreenPlayIcon />}
            </TouchableOpacity>
        </View>
    </View>
};


export const ExerciseSessionScreen = ({ route }: ExerciseSessionScreenProps) => {
    const { params: { id } } = route;

    const { exerciseSchedule }  = useExerciseScheduleById(id) as {
        exerciseSchedule: ExerciseSchedule
    };
    const { createExerciseLog } = useCreateExerciseLog();
    const {  isFinished } = useExerciseLogFromExercise({ exerciseId: exerciseSchedule?.exercise?.id || "", date: todaysDateRegular});

    if(exerciseSchedule === undefined) console.log('exercise schedule exerciseSchedule went cold - ', exerciseSchedule);

    const duration = exerciseSchedule?.time_in_seconds || 0;
    const exerciseName = exerciseSchedule?.exercise?.name;
    const exerciseId = exerciseSchedule?.exercise?.id;
    const isTimedExerciseShown = exerciseSchedule?.exercise?.measurement === ExerciseMeasurements.TIME;
    const isRepsExerciseShown = exerciseSchedule?.exercise?.measurement === ExerciseMeasurements.REPS;
    const sets = exerciseSchedule?.sets || 0;
    const reps = exerciseSchedule?.reps || 0;
    const [isSuccessToastShow, setIsSuccessToastShown] = useState(false);
    const [isExerciseFinished, setIsExerciseFinished] = useState(false);
    const { selectedDate } = useCalendar();
    const date = selectedDate ? new Date(selectedDate) : new Date(todaysDateRegular);

    const handleExerciseIsFinished = () => {
        setIsSuccessToastShown(true);
        setIsExerciseFinished(true);
        if(exerciseId) createExerciseLog({
            exercise_id: exerciseId,
            sets,
            reps,
            date,
            time_in_seconds: duration
        });
    };

    const exerciseNameArray = exerciseName?.split(' ');

    useEffect(()=>{
        setIsExerciseFinished(isFinished)
    }, [isFinished])

    return <SafeAreaView style={styles.area}>
        <Toast 
            visible={isSuccessToastShow} 
            message="Well done! Exercise complete" 
            onDismiss={()=>setIsSuccessToastShown(false)} 
            duration={2500}
        />
        <View style={styles.container}>
            <View style={styles.row}>
                <View>
                    {exerciseNameArray?.map((name)=>{
                        return <View key={name}>
                                <Text color="white" variant="display3" style={styles.exerciseTitle}>{name?.toLocaleUpperCase()}</Text>
                                {/* <Text color="white" variant="display3" style={styles.exerciseTitle}>{name?.toLocaleUpperCase()}</Text> */}
                            </View>
                    })}
                </View>
                {!isExerciseFinished && <TouchableOpacity onPress={handleExerciseIsFinished} style={styles.finishButton}>
                    <Text color="white">DONE</Text>
                    <SquareCheckIcon />
                </TouchableOpacity>}
                {isExerciseFinished && <View style={styles.finishedBadge}>
                    <Text fontWeight="500">FINISHED</Text>
                </View>}
            </View>
            { isTimedExerciseShown && 
                <ExerciseTimedSession 
                    duration={duration} 
                    onFinish={handleExerciseIsFinished}
                    isExerciseFinished={isExerciseFinished}
                />}
            {isRepsExerciseShown && 
                <ExerciseRepsSession 
                    sets={sets} 
                    reps={reps}
                    isExerciseFinished={isExerciseFinished}
                    onFinish={handleExerciseIsFinished}
                />}
        </View>
    </SafeAreaView>
};

const styles = StyleSheet.create({
    area: {
        height: '100%', 
        backgroundColor: '#232323'
    },
    container: {
        padding: 20,
        paddingTop: 44,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    repsContainer: {
        paddingTop: 32,
    },
    timerContainer: {
        paddingTop: 32,
    },
    timerActivityButtons: {
        justifyContent: 'space-between', // Center the buttons horizontally
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'flex-end',
        marginTop: 24
    },
    repsActivityButtons: {
        justifyContent: 'space-between', // Center the buttons horizontally
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'flex-end',
        marginTop: '20%'
    },
    exerciseTitle: {
        maxWidth: 250,
    },
    finishButton: {
        flexDirection: 'row',
        width: 150,
        backgroundColor: Colors.blue,
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'flex-start',
        padding: 10,
        borderRadius: 10
    },
    finishedBadge: {
        width: 150,
        backgroundColor: Colors.highlight,
        alignItems: 'center',
        alignSelf: 'flex-start',
        padding: 10,
        borderRadius: 10
    }
});