import { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "../theme";
import { Colors } from "../theme";
import StopWatchIcon from "../../assets/stop-watch-icon.svg";
import CheckBoxIcon from "../../assets/square-check-icon.svg"
import PlayButton from "../../assets/play-button.svg"
import { useExerciseLogFromExercise } from "../domains/exerciseLog/hooks";
import { useCalendar } from "../domains/calendar/hooks";
import { ExerciseSchedule } from "../domains/exerciseSchedule/types";
import { formatDisplayTime } from "../utility";


type ExerciseSummaryItemProps = {
    title: string;
    onStartPress: (id:string) => void;
    onFinishExercise: (exerciseId: string, finishDate:string) => void
    schedule: ExerciseSchedule
};

export const ExerciseSummaryItem = ({ schedule, title, onStartPress, onFinishExercise }: ExerciseSummaryItemProps) => {
    const scheduleId = schedule?.id;
    const exerciseId = schedule?.exercise?.id;
    const { selectedDate, isSelectedDateAfterToday, isSelectedDateBeforeToday, isSelectedDateToday } = useCalendar();
    const { isFinished, data: log } = useExerciseLogFromExercise({ exerciseId, date: selectedDate });

    const [formattedExerciseTime, setFormattedExerciseTime] = useState<string | null>(null);

    useEffect(()=>{
        let time = null;
        if(isSelectedDateToday && log?.time_in_seconds){
            if(isFinished && log?.time_in_seconds){
                time = log?.time_in_seconds
            } else {    
                time = schedule?.time_in_seconds
            };
        } else if (isSelectedDateBeforeToday){
            time = log?.time_in_seconds
        } else if (isSelectedDateAfterToday){
            time = schedule?.time_in_seconds
        };
        setFormattedExerciseTime(formatDisplayTime(time || 0));
    }, [schedule, log, isSelectedDateToday, isSelectedDateBeforeToday, isSelectedDateAfterToday]);


    const handleFinished = () => {
        if(selectedDate && exerciseId) onFinishExercise(exerciseId, selectedDate);
    };
    const handleStart = () => {
        scheduleId && onStartPress(scheduleId)
    }
    const showTimerMeasurement = schedule?.exercise?.measurement === 'time';
    const showRepsMeasurement = schedule?.exercise?.measurement === 'reps';

    const sets = schedule?.sets;
    const reps = schedule?.reps;

    return <View style={styles.container}>
        <View style={[styles.row]}>
            <Text variant="header3" style={styles.title} fontWeight="600">{title.toUpperCase()}</Text>
            <View style={[styles.row, styles.duration]}>
                { showTimerMeasurement && <StopWatchIcon color={Colors.black} width={24} height={24}/>}
                { showTimerMeasurement && <Text marginLeft="s" variant="header3" color="black" fontWeight="500">{formattedExerciseTime || "00:00:00"}</Text>}
            </View>
            {showRepsMeasurement && <View style={styles.measurement}>
                <View style={[styles.repsWrapper]}>
                    <Text variant="header3" color="black" fontWeight="500" textAlign="center">{sets || 0}</Text>
                    <Text variant="paragraph3" color="black">SETS</Text>
                </View>
                <View style={[styles.repsWrapper]}>
                    <Text variant="header3" color="black" fontWeight="500" textAlign="center">{reps || 0}</Text>
                    <Text variant="paragraph3" color="black">REPS</Text>
                </View>
            </View>}
        </View>
        {isSelectedDateBeforeToday && <View style={styles.actions}>
            {isFinished && <TouchableOpacity style={styles.finished} onPress={()=>scheduleId && onStartPress(scheduleId)}>
                <Text variant="paragraph4" fontWeight="500" textAlign='center'>FINISHED</Text>
            </TouchableOpacity>}
            {!isFinished && <TouchableOpacity style={[styles.doneButton, styles.row]} onPress={handleFinished}>
                <Text variant="paragraph4" color="white" fontWeight="500">DONE</Text>
                <CheckBoxIcon width={14} height={14}/>
            </TouchableOpacity>}
        </View>}
        {isSelectedDateToday && <View style={styles.actions}>
            {isFinished && <TouchableOpacity style={styles.finished} onPress={()=>scheduleId && onStartPress(scheduleId)}>
                <Text variant="paragraph4" fontWeight="500" textAlign='center'>FINISHED</Text>
            </TouchableOpacity>}
            {!isFinished && <TouchableOpacity style={[styles.doneButton, styles.row]} onPress={handleFinished}>
                <Text variant="paragraph4" color="white" fontWeight="500">DONE</Text>
                <CheckBoxIcon width={14} height={14}/>
            </TouchableOpacity>}
            {!isSelectedDateBeforeToday && <TouchableOpacity style={styles.startExercise} onPress={handleStart}>
                <Text variant="paragraph5" fontWeight="500">START EXERCISE</Text>
                <PlayButton width={32} height={32}/>
            </TouchableOpacity>}
        </View>}
        <View>
            {isSelectedDateAfterToday && <Text variant="paragraph4" color="blue" fontWeight="600" marginTop="s">SCHEDULED</Text>}
        </View>
    </View>
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 24,
        paddingBottom: 24,
        backgroundColor: "#F8FAFB",
        borderRadius: 10,
    },
    duration: {
        alignItems:'center',
        justifyContent: 'flex-end',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        maxWidth: 150,
    },
    doneButton: {
        width: 80,
        padding: 10,
        backgroundColor: Colors.blue,
        borderRadius: 6,
        justifyContent: 'space-between'
    },
    finished: {
        width: 80,
        padding: 10,
        backgroundColor: Colors.highlight,
        borderRadius: 6,
        marginTop: 4,
    },
    measurement: {
        flexDirection: 'row',
        gap: 16
    },
    repsWrapper: {
        gap:4
    },
    startExercise: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 24,
        justifyContent: 'space-between'
    }
});