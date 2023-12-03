import { Colors, Text } from "../theme";
import { StyleSheet, View } from "react-native";
import StopWatchIcon from "../../assets/stop-watch-icon.svg";
import { getFormateStopWatchTime } from "../utility";

type ExerciseSessionRepsProps = {
    sets: number;
    reps: number;
    elapsedTime: number;
    isActive: boolean;
    isResting: boolean;
    isFinished: boolean;
};

export const ExerciseSessionReps = ({ sets=3, reps=0, elapsedTime=0, isResting=false, isActive=false, isFinished}: ExerciseSessionRepsProps) => {
    const formatedTime = getFormateStopWatchTime(elapsedTime);
    const isStartReady = !isActive && !isResting
    const activityColor = isFinished || isStartReady ? "white" : isResting ? "blue" : "highlight";

    return <View style={styles.container}>
        <Text color="white" variant="display1">{reps} REPS</Text>
        <View style={[styles.sets, styles.row]}>
            <Text variant="displayXl" color={activityColor}>{sets.toString().padStart(2, '0')}</Text>
            <View>
                <Text variant="header1" color={activityColor}>SETS</Text>
                <Text variant="paragraph2" color={activityColor}>TO GO</Text>
            </View>
        </View>
        <View style={{gap: 8}}>
            <View style={styles.row}>
                <StopWatchIcon color={Colors[activityColor]}/>
                <Text marginLeft="m" variant="header1" color={activityColor}>{formatedTime || "00:00:00"}</Text>
            </View>
            <View>
                {!isFinished && isStartReady &&  <Text color={activityColor} textAlign="center">READY</Text>}
                {!isFinished && isResting && <Text color={activityColor} textAlign="center">RESTING</Text>}
                {!isFinished && isActive && <Text color={activityColor} textAlign="center">ACTIVE</Text>}
                {isFinished && <Text color={activityColor} textAlign="center">ACTIVITY FINISHED</Text>}
            </View>
        </View>
    </View>
};

const styles= StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 48,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sets: {
        gap: 20
    },
    workingOut: {
        color: 'green'
    }
});