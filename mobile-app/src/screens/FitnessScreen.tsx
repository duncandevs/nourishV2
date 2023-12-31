import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native"
import { Text } from "../theme"
import { CalendarWeekPills, ExerciseCategoryList, ExerciseSummaryItem } from "../components";
import { StyleSheet } from "react-native";
import { useSelectedExerciseSchedule } from '../domains/exerciseSchedule/hooks';
import { getDayOfTheWeek, formatDateHeader } from "../utility";
import { AddWorkoutButton } from "../components/AddWorkoutButton";
import { StopWatchButton } from "../components/StopWatchButton";
import { ExerciseSchedule } from "../domains/exerciseSchedule/types";
import { useCalendar } from "../domains/calendar/hooks";
import { useCreateExerciseLog } from "../domains/exerciseLog/hooks";

export const FitnessScreen = ({ navigation }) => {
    const {  todaysDate, todaysDayOfTheWeek, selectedDate } = useCalendar();
    const [ date, setDate ] = useState(todaysDate);
    const [ selectedDay, setSelectedDayDay ] = useState(todaysDayOfTheWeek);

    const { selectedExerciseSchedules, selectedExerciseScheduleCategories  } = useSelectedExerciseSchedule(selectedDay);
    const { createExerciseLog } = useCreateExerciseLog();

    const handleDaySelect = (date: string) => {
        setDate(date);
        const dayString = getDayOfTheWeek(date) || '';
        setSelectedDayDay(dayString);
    };

    const goToCalendarScreen = () => {};

    const dateHeader = formatDateHeader(date); // returns Dec 05, TUESDAY
    const dateWorkoutHeader = dateHeader.split(',')[1];

    const goToExerciseSearchScreen = () => {
        navigation.navigate('ExerciseSearchScreen')
    };

    const goToExerciseSessionScreen = (id:string) => {
        navigation.navigate('ExerciseSessionScreen', {id});
    };

    const handleExerciseIsFinished = (exerciseId:string, finishDate:string) => {
        const date = selectedDate && new Date(finishDate);
        const schedule = selectedExerciseSchedules?.find((s:ExerciseSchedule)=> s.exercise && s.exercise.id===exerciseId);
        date && createExerciseLog({
            exercise_id: exerciseId,
            sets: schedule?.sets,
            reps: schedule?.reps,
            date,
            time_in_seconds: schedule?.time_in_seconds
        });
    };

    const isScheduleEmpty = selectedExerciseSchedules.length === 0

    return  <ScrollView style={{backgroundColor: 'white'}}>
        <View style={[styles.container, styles.gutter]}>
            <View style={[styles.row, styles.header]}>
                <View>
                    <Text variant="paragraph1" fontWeight="600" style={{maxWidth: 175}}>Your Fitness Schedule</Text>
                    <Text variant='paragraph3' fontWeight="600" color="gray03" marginTop="s">{dateHeader}</Text>  
                </View>
                <AddWorkoutButton handleOnPress={()=>goToExerciseSearchScreen()} />
            </View>
            <View>
                <CalendarWeekPills 
                    handleCalendarIconPress={goToCalendarScreen} 
                    handleCalendarDayPress={handleDaySelect}
                />
            </View>
            {!isScheduleEmpty && <View style={styles.scheduleList}>
                <View style={{gap: 20}}>
                    <Text variant="header3" fontWeight="500" marginTop="l">{dateWorkoutHeader} WORKOUT</Text>
                    <ExerciseCategoryList categories={selectedExerciseScheduleCategories || []} disableButtons/>
                </View>
                {selectedExerciseSchedules?.map((schedule: ExerciseSchedule, idx)=> {
                    const exercise = schedule.exercise;
                    return exercise ? <ExerciseSummaryItem 
                        key={exercise.id}
                        schedule={schedule}
                        title={exercise.name} 
                        onStartPress={goToExerciseSessionScreen} 
                        onFinishExercise={handleExerciseIsFinished}
                    /> : null;
                })}
            </View>}
            {isScheduleEmpty && <View style={styles.emptySchedule}>
                <Text textAlign="center">No Exercises Scheduled</Text>
                <Text textAlign="center" textDecorationLine="underline" onPress={goToExerciseSearchScreen}>click to add workout</Text>
            </View>}
        </View>
    </ScrollView>
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
    },
    scheduleList: {
        gap: 40, 
        paddingBottom: 84,
    },
    emptySchedule: {
        marginTop: '40%',
        gap: 24
    }
})