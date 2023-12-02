import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "../theme";
import { useExerciseScheduleById } from "../domains/exerciseSchedule/hooks";
import { ExerciseSchedule } from "../domains/exerciseSchedule/types";
import { ExerciseMeasurements } from "../domains/exercise/types";
import { useStopWatch, useTimer } from "../domains/exercise/hooks";
import PlayButton from "../../assets/green-play-button.svg";
import ResetButton from "../../assets/green-reset-button.svg";
import StopButton from "../../assets/green-stop-button.svg";
import { ExerciseSessionTimer, ExerciseSessionReps } from "../components";
import { useState } from "react";
import GreenPlayIcon from "../../assets/green-play-button.svg";
import GreenCheckIcon from "../../assets/green-check-button.svg";
import BlueCooldownIcon from "../../assets/blue-cooldown-button.svg"

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
};

type ExerciseRepsSessionProps = {
    sets: number;
    reps: number;
};

export const ExerciseTimedSession = ({ duration }: ExerciseTimedSessionProps) => {
    const { handleStartStop, handleReset, remainingTime, isRunning } = useTimer(duration || 0);

    return <View style={styles.counterContainer}>
            <ExerciseSessionTimer timeInSeconds={remainingTime|| 0}/>
            <View style={[styles.row, styles.activityButtons]}>
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

export const ExerciseRepsSession = ({ sets, reps }: ExerciseRepsSessionProps) => {
    const [ isResting, setIsResting ] = useState(false);
    const [ isActive, setIsActive ] = useState(false);
    const { handleResetStart, handleEnd, elapsedTime, isRunning } = useStopWatch();
    const [ setsData, setSetsData ] = useState(sets);
    const [ isFinished, setIsFinished ] = useState(false);

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

        let newSets = setsData;
        newSets = subtractReps();

        if(newSets === 0) {
            onEndExercise();
            return;
        };
        setIsResting(false);
        setIsActive(true);
        if(!isRunning) handleResetStart();
    };

    const onEndExercise = () => {
        setIsActive(false);
        handleEnd();
        setIsFinished(true);
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
        setIsActive(false);
        setIsResting(true);
        setIsFinished(false);
    };

    // const activityString = isFinished ? 'RESTART' : isActive ? 'START RESTING' : 'START ACTIVITY'

    return <View style={styles.counterContainer}>
        <ExerciseSessionReps 
            sets={setsData} 
            reps={reps} 
            elapsedTime={elapsedTime} 
            isResting={isResting} 
            isFinished={isFinished}
            isActive={isActive}
        />
        <View style={[styles.activityButtons, styles.row]}>
            <View style={{flexDirection: 'row', gap: 18}}>
                <TouchableOpacity onPress={handleActivityReset}>
                    <ResetButton width={64} height={64} /> 
                </TouchableOpacity>
                <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={handleResting}>
                    <BlueCooldownIcon width={64} height={64}/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onActivityPress}>
                {isActive && <GreenCheckIcon />}
                {!isActive && <GreenPlayIcon />}
            </TouchableOpacity>
        </View>
    </View>
}


export const ExerciseSessionScreen = ({ navigation, route }: ExerciseSessionScreenProps) => {
    const { params: { id } } = route;
    const data: ExerciseSchedule  = useExerciseScheduleById(id)?.data;
    const duration = data?.time_in_seconds || 0;
    const exerciseName = data?.exercise?.name;
    const isTimedExerciseShown = data?.exercise?.measurement === ExerciseMeasurements.TIME;
    const isRepsExerciseShown = data?.exercise?.measurement === ExerciseMeasurements.REPS;
    const sets = data?.sets || 0;
    const reps = data?.reps || 0;

    return <SafeAreaView style={styles.area}>
        <View style={styles.container}>
            <Text color="white" variant="display3">{exerciseName?.toLocaleUpperCase()}</Text>
            { isTimedExerciseShown && <ExerciseTimedSession duration={duration} />}
            {isRepsExerciseShown && <ExerciseRepsSession sets={sets} reps={reps}/>}
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
        paddingTop: 44
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    counterContainer: {
        marginTop: 64,
        height: '88%',
    },
    activityButtons: {
        position: 'absolute', // Use absolute positioning
        bottom: 32, // 32 pixels from the bottom of the screen
        left: 0, // Align to the left
        right: 0, // Align to the right
        justifyContent: 'space-between', // Center the buttons horizontally
        padding: 20,
    }
});