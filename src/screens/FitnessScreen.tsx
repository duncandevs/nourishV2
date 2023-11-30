import { useState } from "react";
import { TouchableOpacity, View } from "react-native"
import { Text } from "../theme"
import { CalendarWeekPills } from "../components";
import { StyleSheet } from "react-native";
import { useExerciseSchedules, useSelectedExerciseSchedule } from '../domains/exerciseSchedule/hooks';
import { getTodaysDayOfTheWeek, getDayOfTheWeek, todaysDateRegular, formatDateHeader } from "../utility";
import { useExerciseLogs } from "../domains/exerciseLog/hooks";
import { AddWorkoutButton } from "../components/AddWorkoutButton";
import { StopWatchButton } from "../components/StopWatchButton";

const TODAY = getTodaysDayOfTheWeek();

export const FitnessScreen = ({ navigation }) => {
    const [ date, setDate ] = useState(todaysDateRegular);
    const [ selectedDay, setSelectedDayDay ] = useState(TODAY);
    const { selectedExerciseSchedule  } = useSelectedExerciseSchedule(selectedDay);
    const { createExerciseSchedule, updateExerciseSchedule } = useExerciseSchedules();
    const { createExerciseLog } = useExerciseLogs();

    const handleDaySelect = (date: string) => {
        setDate(date);
        const dayString = getDayOfTheWeek(date) || '';
        setSelectedDayDay(dayString);
    };

    const goToCalendarScreen = () => {
        console.log('go to calendar screen');
    };

    const addNewExercise = async () => {
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

    const updateExercise = async () => {
        await updateExerciseSchedule({
            exercise_id: 'c18e16ea-d5e8-46a7-9c3f-a6c8e671b655',
            time_in_seconds: 7000,
            monday: null,
            tuesday: true,
            wednesday: null,
            thursday: true,
            friday: null,
            saturday: null,
            sunday: true,
        });
    };

    const createNewExerciseLog = async () => {
        await createExerciseLog({
            exercise_id: 'c18e16ea-d5e8-46a7-9c3f-a6c8e671b655',
            date: new Date(),
            time_in_seconds: 7000
        })
    };

    const dateHeader = formatDateHeader(date);

    const goToWorkoutSearchScreen = () => {
        navigation.navigate('WorkoutSearchScreen')
    };

    return <View style={[styles.container, styles.gutter]}>
        <View style={[styles.row, styles.header]}>
            <View>
                <Text variant="paragraph1" fontWeight="600">Fitness</Text>
                <Text variant='paragraph3' fontWeight="600" color="gray03" marginTop="s">{dateHeader}</Text>  
            </View>
            <AddWorkoutButton handleOnPress={()=>goToWorkoutSearchScreen()} />
        </View>
        <View>
            <CalendarWeekPills 
                handleCalendarIconPress={goToCalendarScreen} 
                handleCalendarDayPress={handleDaySelect}
            />
        </View>
        <View>
            <StopWatchButton onPress={()=>navigation.navigate('StopWatchScreen')} containerStyle={styles.stopWatch}/>
        </View>
        <View>
            <TouchableOpacity onPress={addNewExercise}>
                <Text>Add Exercise</Text>
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity onPress={updateExercise}>
                <Text>Update Exercise</Text>
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity onPress={createNewExerciseLog}>
                <Text>Create Exercise Log</Text>
            </TouchableOpacity>
        </View>
        <View>
            {selectedExerciseSchedule?.map((schedule, idx)=> {
                return <Text key={idx}>{schedule?.exercise?.name}</Text>
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
    gutter: {
        paddingLeft: 16,
        paddingRight: 16
    },
    row: {
        flexDirection: 'row'
    },
    header: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24
    },
    stopWatch: {
        marginTop: 32,
        marginBottom: 32
    }
})