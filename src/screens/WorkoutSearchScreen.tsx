import { StyleSheet, View } from "react-native";
import { Text } from "../theme";

export const WorkoutSearchScreen = () => {
    return <View style={styles.container}>
        <Text variant="paragraph1">Search Workouts</Text>
    </View>
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 64
    }
})

