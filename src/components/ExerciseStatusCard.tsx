import { StyleSheet, View } from "react-native";
import { Text } from "../theme";
import { Colors } from "../theme";
import StopWatchIcon from "../../assets/stop-watch-icon.svg";

export const ExerciseStatusCard = () => {
    const formatedTime = 0;
    // grab the exercise Log
    // join the exercise schedule

    <View>
        <View style={styles.row}>
            <StopWatchIcon color={Colors.blue}/>
            <Text marginLeft="m" variant="header1" color="blue">{formatedTime || "00:00:00"}</Text>
        </View>
    </View>
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})


