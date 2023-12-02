import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "../theme";
import { useExercises } from '../domains/exercise/hooks';
import { ExerciseItem } from '../components/ExerciseItem';



export const ExerciseSearchScreen = () => {
    const { exercises } = useExercises();
    return <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <Text variant="paragraph1" marginTop="l">Search Workouts</Text>
                <View style={styles.exercises}>
                    {exercises && exercises?.map(
                        (exercise)=><ExerciseItem exercise={exercise} key={exercise.name}/>)
                    }
                </View>
            </ScrollView>
    </View>
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
    },
    scrollContainer: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    exercises: {
        gap: 24,
        marginTop: 32,
        paddingBottom: 64
    }
})

