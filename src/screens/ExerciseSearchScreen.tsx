import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "../theme";
import { useExerciseSearch } from '../domains/exercise/hooks';
import { ExerciseItem } from '../components';
import { ExerciseCategoryList } from "../components";
import { Input } from "react-native-elements";
import SearchIcon from "../../assets/search-icon.svg"

export const ExerciseSearchScreen = () => {
    const {
        scheduledExercises,
        unscheduledExercises,
        filteredExercises,
        isFilteredShown,
        handleSearch,
        handleSelectCategory,
    } = useExerciseSearch();

    const isUnscheduledExercisesShown = !!unscheduledExercises?.length;

    return <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <View style={{marginTop: 40}}>
                    <Input 
                        leftIcon={<SearchIcon />} 
                        onChangeText={(value)=>handleSearch(value)} 
                        placeholder="Exercise"
                    />
                    <ExerciseCategoryList 
                        categories={['all', 'cardio', 'arms', 'legs', 'shoulders', 'back', 'chest', 'stretch', 'sport']}
                        handleSelectCategory={handleSelectCategory}
                    />
                </View>
                <View>
                    {!isFilteredShown && <>
                        <View style={styles.exerciseListContainer}>
                            <Text variant="header3" fontWeight="600" textAlign="center">My Workouts</Text>
                            <View style={styles.exercises}>
                                {scheduledExercises?.map(({ exercise, exerciseSchedule })=><ExerciseItem exercise={exercise} exerciseSchedule={exerciseSchedule} key={`myexercise-${exercise.name}`}/>)}
                            </View>
                        </View>
                        {isUnscheduledExercisesShown && <View>
                            <Text variant="header3" fontWeight="600" textAlign="center">All Workouts</Text>
                            <View style={styles.exercises}>
                                {unscheduledExercises?.map(({ exercise, exerciseSchedule })=><ExerciseItem exercise={exercise} exerciseSchedule={exerciseSchedule} key={`all-${exercise.name}`}/>)}
                            </View>
                        </View>}
                    </>}
                    {isFilteredShown && <>
                        <View style={styles.exercises}>
                                {filteredExercises?.map(({ exercise, exerciseSchedule })=><ExerciseItem exercise={exercise} exerciseSchedule={exerciseSchedule} key={`filtered-${exercise.name}`}/>)}
                        </View>
                    </>}
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
    exerciseListContainer: {
        marginTop: 32,
    },
    exercises: {
        gap: 24,
        marginTop:32,
        paddingBottom: 64
    }
})

