import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "../theme";
import { Colors } from "../theme";
import StopWatchIcon from "../../assets/stop-watch-icon.svg";
import { useExerciseLogFromExercise } from "../domains/exerciseLog/hooks";
import { todaysDateRegular } from "../utility";
import { useCalendar } from "../domains/calendar/hooks";

type ExerciseSummaryItemProps = {
    exerciseId: string;
    scheduleId:string;
    title: string;
    onStartPress: (id:String) => void;
};

export const ExerciseSummaryItem = ({ scheduleId, exerciseId, title, onStartPress }: ExerciseSummaryItemProps) => {
    // TODO: date here has to be replaced with the date selected not today's date > any date of the week may render this
    const {isFinished} = useExerciseLogFromExercise({ exerciseId, date: todaysDateRegular });
    const formatedTime = 0;
    const { selectedDate, todaysDate } = useCalendar();
    const isAfterToday = selectedDate ? new Date(selectedDate) > new Date(todaysDate) : false;

    return <View style={styles.container}>
        <View style={[styles.row]}>
            <Text variant="header3" style={styles.title} fontWeight="600">{title.toUpperCase()}</Text>
            <View style={[styles.row, styles.duration]}>
                <StopWatchIcon color={Colors.blue} width={32} height={32}/>
                <Text marginLeft="m" variant="header3" color="blue" fontWeight="600">{formatedTime || "00:00:00"}</Text>
            </View>
        </View>
        {!isAfterToday && <View>
            {isFinished && <TouchableOpacity style={styles.finished} onPress={()=>onStartPress(scheduleId)}>
                <Text variant="paragraph4" fontWeight="500">FINISHED</Text>
            </TouchableOpacity>}
            {!isFinished && <TouchableOpacity style={styles.button} onPress={()=>onStartPress(scheduleId)}>
                <Text variant="paragraph4" color="white" fontWeight="500">START EXERCISE</Text>
            </TouchableOpacity>}
        </View>}
    </View>
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 24,
        paddingBottom: 24,
        backgroundColor: "#F8FAFB",
        borderRadius: 10,
        // minHeight: 160,
    },
    duration: {
        width: 150,
        alignItems:'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        maxWidth: 150
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
    }
});