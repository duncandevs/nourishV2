import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "../theme";
import { Colors } from "../theme";
import StopWatchIcon from "../../assets/stop-watch-icon.svg";
import CheckBoxIcon from "../../assets/square-check-icon.svg"
import { useExerciseLogFromExercise } from "../domains/exerciseLog/hooks";
import { useCalendar } from "../domains/calendar/hooks";
import { ExerciseSchedule } from "../domains/exerciseSchedule/types";


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
    const {isFinished} = useExerciseLogFromExercise({ exerciseId, date: selectedDate })
    const formatedTime = 0;

    const handleFinished = () => {
        if(selectedDate && exerciseId) onFinishExercise(exerciseId, selectedDate);
    };
    const showTimerMeasurement = schedule?.exercise?.measurement === 'time';
    const showRepsMeasurement = schedule?.exercise?.measurement === 'reps';

    const sets = schedule?.sets;
    const reps = schedule?.reps;

    return <View style={styles.container}>
        <View style={[styles.row]}>
            <Text variant="header3" style={styles.title} fontWeight="600">{title.toUpperCase()}</Text>
            <View style={[styles.row, styles.duration]}>
                { showTimerMeasurement && <StopWatchIcon color={Colors.blue} width={32} height={32}/>}
                { showTimerMeasurement && <Text marginLeft="s" variant="header3" color="blue" fontWeight="500">{formatedTime || "00:00:00"}</Text>}
            </View>
            {showRepsMeasurement && <View style={styles.measurement}>
                <View style={[styles.repsWrapper]}>
                    <Text variant="header3" color="blue" fontWeight="500" textAlign="center">{sets || 0}</Text>
                    <Text variant="paragraph3" color="blue">SETS</Text>
                </View>
                <View style={[styles.repsWrapper]}>
                    <Text variant="header3" color="blue" fontWeight="500" textAlign="center">{reps || 0}</Text>
                    <Text variant="paragraph3" color="blue">REPS</Text>
                </View>
            </View>}
        </View>
        <View>
            {isSelectedDateToday && <View>
                {isFinished && <TouchableOpacity style={styles.finished} onPress={()=>scheduleId && onStartPress(scheduleId)}>
                    <Text variant="paragraph4" fontWeight="500">FINISHED</Text>
                </TouchableOpacity>}
                {!isFinished && <TouchableOpacity style={styles.button} onPress={()=>scheduleId && onStartPress(scheduleId)}>
                    <Text variant="paragraph4" color="white" fontWeight="500">START EXERCISE</Text>
                </TouchableOpacity>}
            </View>}
            {isSelectedDateBeforeToday && <View>
                {isFinished && <TouchableOpacity style={styles.finished} onPress={()=>scheduleId && onStartPress(scheduleId)}>
                    <Text variant="paragraph4" fontWeight="500">FINISHED</Text>
                </TouchableOpacity>}
                {!isFinished && <TouchableOpacity style={[styles.button, styles.row]} onPress={handleFinished}>
                    <Text variant="paragraph4" color="white" fontWeight="500">DONE</Text>
                    <CheckBoxIcon />
                </TouchableOpacity>}
            </View>}
            <View>
                {isSelectedDateAfterToday && <Text variant="paragraph4" color="blue" fontWeight="600" marginTop="s">SCHEDULED</Text>}
            </View>
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
    button: {
        maxWidth: 124,
        padding: 10,
        backgroundColor: Colors.blue,
        borderRadius: 6,
        marginTop: 16
    },
    finished: {
        width: 124,
        padding: 10,
        backgroundColor: Colors.highlight,
        borderRadius: 6,
        marginTop: 16
    },
    measurement: {
        flexDirection: 'row',
        gap: 16
    },
    repsWrapper: {
        gap:4
    }
});