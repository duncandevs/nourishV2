import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native"
import { Colors, Text } from "../theme"
import { CalendarWeekPills } from "../components";
import { StyleSheet } from "react-native";
import { useSelectedExerciseSchedule } from '../domains/exerciseSchedule/hooks';
import { getTodaysDayOfTheWeek, getDayOfTheWeek, todaysDateRegular, formatDateHeader } from "../utility";
import { AddWorkoutButton } from "../components/AddWorkoutButton";
import { StopWatchButton } from "../components/StopWatchButton";
import { ExerciseSchedule } from "../domains/exerciseSchedule/types";

const TODAY = getTodaysDayOfTheWeek();

export const FitnessScreen = ({ navigation }) => {
    const [ date, setDate ] = useState(todaysDateRegular);
    const [ selectedDay, setSelectedDayDay ] = useState(TODAY);
    const { selectedExerciseSchedule  } = useSelectedExerciseSchedule(selectedDay);

    const handleDaySelect = (date: string) => {
        setDate(date);
        const dayString = getDayOfTheWeek(date) || '';
        setSelectedDayDay(dayString);
    };

    const goToCalendarScreen = () => {
        console.log('go to calendar screen');
    };

    const dateHeader = formatDateHeader(date);

    const goToExerciseSearchScreen = () => {
        navigation.navigate('ExerciseSearchScreen')
    };

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
            <View>
                <StopWatchButton onPress={()=>navigation.navigate('StopWatchScreen')} containerStyle={styles.stopWatch}/>
            </View>
            <View style={{gap: 20, paddingBottom: 84}}>
                {selectedExerciseSchedule?.map((schedule: ExerciseSchedule, idx)=> {
                    return <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Colors.gray01, height: 96, alignItems:'center', padding: 10, borderRadius: 10}} key={schedule.id}>
                        <Text key={idx} variant="paragraph1">{schedule?.exercise?.name}</Text>
                        <TouchableOpacity onPress={()=>navigation.navigate('ExerciseSessionScreen', {id: schedule.id})}>
                            <Text variant="header3">start exercie</Text>
                        </TouchableOpacity>
                    </View>
                })}
            </View>
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
    }
})