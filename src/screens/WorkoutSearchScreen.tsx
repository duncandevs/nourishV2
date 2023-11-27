import { StyleSheet, View } from "react-native";
import { Text } from "../theme";
import { useExercises } from '../domains/exercise/hooks';
import { ExerciseItem } from '../components/ExerciseItem';



export const WorkoutSearchScreen = () => {
    const { exercises } = useExercises();

    return <View style={styles.container}>
        <Text variant="paragraph1">Search Workouts</Text>
        <View style={styles.exercises}>
            {exercises && exercises?.map(
                (exercise)=><ExerciseItem exercise={exercise}/>)
            }
        </View>
    </View>
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 64
    },
    exercises: {
        gap: 24
    }
})

