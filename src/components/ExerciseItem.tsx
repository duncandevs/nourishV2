import { useState } from 'react';
import { View, StyleSheet, Pressable } from "react-native";
import { Text } from "../theme";
import { Exercise } from "../domains/exercise/types";
import { ABBREV_DAYS, ABBREV_DAYS_FULL_STRING_MAP } from '../utility';
import { CheckBox } from 'react-native-elements'


type ExerciseProps = {
    exercise: Exercise
    containerStyle?: {}
};

type TimeDisplayProps = {
    time?: number
};

type CalendarSelectorProps = {
    handleDaySelect?: () => void
};

const TimeDisplay = ({ time }:TimeDisplayProps) => {
    return <Text variant="paragraph2" color="gray03" fontWeight="500">00:00:00</Text>
};

const CalendarSelector = ({ handleDaySelect }: CalendarSelectorProps) => {
    const initialChecked = ABBREV_DAYS?.reduce((acc:Record<string, boolean>, day:string) => {
        acc[day] = false
        return acc
    } , {});

    const [checkedValues, setCheckedValues ] = useState(initialChecked);
    const handleCheck = (day: string) => {
        setCheckedValues({...checkedValues, ...{[day]: !checkedValues[day]}})
    };

    return <View style={styles.calendarWrapper}>
        {ABBREV_DAYS?.map((day:string)=>{
            return <Pressable style={styles.calendarDayWrapper} onPress={(e)=>handleCheck(day)}>
                <Text textAlign='center' variant='body' fontWeight='500'>{day}</Text>
                <CheckBox containerStyle={styles.calendarDayCheckbox} checked={checkedValues[day]} onPress={(e)=>handleCheck(day)}/>
            </Pressable>
        })}
    </View>
};


export const ExerciseItem = ({ exercise, containerStyle }: ExerciseProps) => {
    const [ isExpanded, setIsExpanded ] = useState(false);
    const isTimerShown = !isExpanded;

    const handleExpandSection = () => {
        !isExpanded && setIsExpanded(true)
    }

    return <View style={[styles.container, containerStyle]}>
        <Pressable style={[ styles.miniContainer, styles.row ]} onPress={handleExpandSection}>
            <View style={[styles.titleContent]}>
                <Text variant="paragraph2" fontWeight="500">{exercise.name.toUpperCase()}</Text>
                {isTimerShown && <TimeDisplay />}
            </View>
        </Pressable>
        {isExpanded && <View style={styles.calendarContainer}>
            <CalendarSelector />
        </View>}
    </View>
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        backgroundColor: '#F8FAFB',
        paddingBottom: 24
    },
    miniContainer: {
        height: 114,
        width: '100%',
        padding: 16,
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row'
    },
    titleContent: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    calendarContainer: {
        alignSelf: 'center'
    },
    calendarWrapper: {
        flexDirection: 'row'
    },
    calendarDayWrapper: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    calendarDayCheckbox: {
        padding: 0,
        paddingLeft: 4,
        alignSelf: 'center',
        justifySelf: 'center'
    }
})