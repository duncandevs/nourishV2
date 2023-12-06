import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "../theme";
import { useExercises } from '../domains/exercise/hooks';
import { ExerciseItem } from '../components/ExerciseItem';
import { Exercise } from "../domains/exercise/types";
import { Input } from "react-native-elements";
import { useEffect, useState } from "react";
import { useExerciseSchedules } from "../domains/exerciseSchedule/hooks";
import { ExerciseSchedule } from "../domains/exerciseSchedule/types";
import ExerciseScheduleService from "../domains/exerciseSchedule/services";

type FormattedExerciseItem = {
    exercise: Exercise;
    exerciseSchedule: ExerciseSchedule | null;
};

export const ExerciseSearchScreen = () => {
    const { exercises } = useExercises() as {exercises: Exercise[]};
    const [ exerciseItems , setExerciseItems ] = useState<FormattedExerciseItem[]>([]);
    const [ filteredExercises, setFilteredExercises ] = useState<FormattedExerciseItem[]>(exerciseItems);
    const [ scheduledExercises, setScheduledExercises] = useState<FormattedExerciseItem[]>([]);
    const [ unscheduledExercises, setUnscheduledExercises ] = useState<FormattedExerciseItem[]>([]);
    const { getExerciseScheduleByExerciseId } = useExerciseSchedules();
    const [ isFilteredShown, setIsFilteredShown ] = useState(!scheduledExercises?.length);
    const { data: exerciseSchedules } = useExerciseSchedules();

    const handleSearch = (searchTerm: string) => {
        setIsFilteredShown(!!searchTerm || !scheduledExercises?.length);
        const f = exerciseItems?.filter(({ exercise })=>exercise.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
        setFilteredExercises(f);
    };

    useEffect(()=>{
        const exerciseItems = exercises?.map((exercise): FormattedExerciseItem=>({
            exercise: exercise,
            exerciseSchedule: getExerciseScheduleByExerciseId(exercise.id)
        }));
        setExerciseItems(exerciseItems);
        setFilteredExercises(exerciseItems);
    }, [exercises, exerciseSchedules]);

    useEffect(()=>{
        setScheduledExercises (
            exerciseItems?.filter(({ exerciseSchedule })=>ExerciseScheduleService.isExerciseScheduled(exerciseSchedule))
        );
        setUnscheduledExercises (
            exerciseItems?.filter(({ exerciseSchedule })=>!ExerciseScheduleService.isExerciseScheduled(exerciseSchedule))
        );
    }, [exerciseItems]);

    useEffect(()=>{
        setIsFilteredShown(!scheduledExercises?.length);
    }, [scheduledExercises])
    

    return <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <Text variant="paragraph1" marginTop="l">Search Workouts</Text>
                <Input onChangeText={(value)=>handleSearch(value)} />
                <View>
                    {!isFilteredShown && <>
                        <View style={styles.exerciseListContainer}>
                            <Text variant="header3" fontWeight="600">My Workouts</Text>
                            <View style={styles.exercises}>
                                {scheduledExercises?.map(({ exercise, exerciseSchedule })=><ExerciseItem exercise={exercise} exerciseSchedule={exerciseSchedule} key={exercise.name}/>)}
                            </View>
                        </View>
                        <View>
                            <Text variant="header3" fontWeight="600">Other Workouts</Text>
                            <View style={styles.exercises}>
                                {unscheduledExercises?.map(({ exercise, exerciseSchedule })=><ExerciseItem exercise={exercise} exerciseSchedule={exerciseSchedule} key={exercise.name}/>)}
                            </View>
                        </View>
                    </>}
                    {isFilteredShown && <>
                        <View style={styles.exercises}>
                                {filteredExercises?.map(({ exercise, exerciseSchedule })=><ExerciseItem exercise={exercise} exerciseSchedule={exerciseSchedule} key={exercise.name}/>)}
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

