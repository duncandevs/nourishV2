import { useState } from "react";
import { View } from "react-native"
import { Text } from "../theme"
import { CalendarWeekPills } from "../components";
import { StyleSheet } from "react-native";
import { useSelectedExerciseSchedule } from '../domains/exerciseSchedule/hooks';
import { getTodaysDayOfTheWeek, getDayOfTheWeek, todaysDateRegular, formatDateHeader } from "../utility";
import { AddWorkoutButton } from "../components/AddWorkoutButton";
import { StopWatchButton } from "../components/StopWatchButton";

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