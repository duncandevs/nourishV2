import { StyleSheet, View } from "react-native";
import { Text } from "../theme";
import { getHoursFromSeconds, getMinutesFromSeconds, getSeconds } from "../utility";

type TimerSessionProps = {
    timeInSeconds: number
}

export const ExerciseSessionTimer = ({ timeInSeconds }: TimerSessionProps) => {
    const hours = getHoursFromSeconds(timeInSeconds)
    const minutes = getMinutesFromSeconds(timeInSeconds)
    const seconds = getSeconds(timeInSeconds)
    const hoursDisplay = `${hours.toString().padStart(2, '0')}`;
    const minutesDisplay = `${minutes.toString().padStart(2, '0')}`;
    const secondsDisplay = `${seconds.toString().padStart(2, '0')}`;

    return <View style={styles.timerContainer}>
        <View style={styles.row}>
            <View style={styles.timerDisplayWrapper}>
                <Text variant="displayXl" color="white">{hoursDisplay}</Text>
            </View>
            <View style={styles.timerLabelWrapper}>
                <Text color="white" variant="display2" style={styles.timerLabel}>h</Text>
            </View>
        </View>
        <View style={styles.row}>
            <View style={styles.timerDisplayWrapper}>
                <Text variant="displayXl" color="white">{minutesDisplay}</Text>
            </View>
            <View style={styles.timerLabelWrapper}>
                <Text color="white" variant="display2" style={styles.timerLabel}>m</Text>
            </View>
        </View>
        <View style={styles.row}>
            <View style={styles.timerDisplayWrapper}>
                <Text variant="displayXl" color="white">{secondsDisplay}</Text>
            </View>
            <View style={styles.timerLabelWrapper}>
                <Text color="white" variant="display2" style={styles.timerLabel}>s</Text>
            </View>
        </View>
    </View>

};

const styles = StyleSheet.create({
    timerContainer: {
        alignSelf: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    timerLabel: {
        marginTop: 48,
    },
    timerDisplayWrapper: {
        width: 250,
        alignItems: 'center'
    },
    timerLabelWrapper: {
        width: 60,
        alignItems: 'center'
    },
})