import { useState } from "react";
import { TouchableOpacity, View } from "react-native"
import { Text } from "../theme"
import { CalendarWeekPills } from "../components";
import { StyleSheet } from "react-native";
import { useExerciseSchedules, useSelectedExerciseSchedule } from '../domains/exerciseSchedule/hooks';
import { getTodaysDayOfTheWeek, getDayOfTheWeek } from "../utility";

const TODAY = getTodaysDayOfTheWeek();

export const FitnessScreen = () => {
    const [ selectedDay, setSelectedDayDay ] = useState(TODAY);
    const { selectedExerciseSchedule  } = useSelectedExerciseSchedule(selectedDay);
    const { createExerciseSchedule, createExerciseScheduleError } = useExerciseSchedules();

    const handleDaySelect = (date: string) => {
        const dayString = getDayOfTheWeek(date) || '';
        setSelectedDayDay(dayString);
    };

    const goToCalendarScreen = () => {
        console.log('go to calendar screen');
    };

    const addNewExercise = async () => {
        console.log('adding new exercise');
        await createExerciseSchedule({
            exercise_id: 'c18e16ea-d5e8-46a7-9c3f-a6c8e671b655',
            time_in_seconds: 2700,
            monday: null,
            tuesday: true,
            wednesday: null,
            thursday: true,
            friday: null,
            saturday: null,
            sunday: true,
        });
    };
    console.log('createExerciseScheduleError - ', createExerciseScheduleError)

    return <View style={styles.container}>
        <View style={[styles.row]}>
            <CalendarWeekPills 
                handleCalendarIconPress={goToCalendarScreen} 
                handleCalendarDayPress={handleDaySelect}
            />
        </View>
        <View>
            <TouchableOpacity onPress={addNewExercise}>
                <Text>Add Exercise</Text>
            </TouchableOpacity>
        </View>
        <View>
            {selectedExerciseSchedule?.map((schedule)=> {
                return <Text>{schedule?.exercise?.name}</Text>
            })}
        </View>
    </View>
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 32,
        height: '100%',
        backgroundColor: 'white',
    },
    row: {
        padding: 16
    }
})