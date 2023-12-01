import { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { Text } from "../theme";
import { Exercise } from "../domains/exercise/types";
import { ABBREV_DAYS, DAYS_OF_THE_WEEK } from '../utility';
import { CheckBox } from 'react-native-elements';
import { ExerciseRepsSelector } from "../components";
import { useExerciseSchedules } from "../domains/exerciseSchedule/hooks";
import BlueCheck from "../../assets/blue-check.svg"
import { ExerciseScheduleParams } from '../domains/exerciseSchedule/services';

type ExerciseProps = {
    exercise: Exercise
    containerStyle?: {}
};

type TimeDisplayProps = {
    time?: number
};

type CalendarSelectorProps = {
    handleDaySelect: (day:string) => void;
    scheduledDays: Record<string, boolean>;
};

type ExerciseReps = {
    reps: number,
    sets: number
};

type ExerciseScheduleDays = {
    monday: string | null,
    tuesday: string | null,  
    wednesday: string | null,  
    thursday: string | null,  
    friday: string | null,  
    saturday: string | null,  
    sunday: string | null, 
}

const TimeDisplay = ({ time }:TimeDisplayProps) => {
    return <Text variant="paragraph2" color="gray03" fontWeight="500">00:00:00</Text>
};

const CalendarSelector = ({ handleDaySelect, scheduledDays }: CalendarSelectorProps) => {
    return <View style={styles.calendarWrapper}>
        {DAYS_OF_THE_WEEK?.map((day:string, idx: number)=>{
            return <Pressable style={styles.calendarDayWrapper} onPress={(e)=>handleDaySelect(day)} key={day}>
                <Text textAlign='center' variant='body' fontWeight='500'>{ABBREV_DAYS[idx]}</Text>
                <CheckBox containerStyle={styles.calendarDayCheckbox} checked={scheduledDays[day]} onPress={(e)=>handleDaySelect(day)}/>
            </Pressable>
        })}
    </View>
};


export const ExerciseItem = ({ exercise, containerStyle }: ExerciseProps) => {
    const { createOrUpdateExerciseSchedule, getExerciseScheduleByExerciseId } = useExerciseSchedules();
    const exerciseSchedule = getExerciseScheduleByExerciseId(exercise.id);
    console.log('exerciseSchedule from exercise item - ', exerciseSchedule);

    const [ exerciseScheduleData, setExerciseScheduleData ] = useState<ExerciseScheduleParams>({
        exercise_id: exercise.id,
        time_in_seconds: exerciseSchedule?.time_in_seconds || 0,
        sets: exerciseSchedule?.sets || 0,
        reps: exerciseSchedule?.reps || 0,
        monday: exerciseSchedule?.monday || false,
        tuesday: exerciseSchedule?.tuesday || false,
        wednesday: exerciseSchedule?.wednesday || false,
        thursday: exerciseSchedule?.thursday || false,
        friday: exerciseSchedule?.friday || false,
        saturday: exerciseSchedule?.saturday || false,
        sunday: exerciseSchedule?.sunday || false,
    });
    const [ isExpanded, setIsExpanded ] = useState(false);
    const isTimerShown = !isExpanded;
    const [scheduledDays, setScheduledDays ] = useState({
        monday: exerciseScheduleData.monday || false,
        tuesday: exerciseScheduleData.tuesday || false,
        wednesday: exerciseScheduleData.wednesday || false,
        thursday: exerciseScheduleData.thursday || false,
        friday: exerciseScheduleData.friday || false,
        saturday: exerciseScheduleData.saturday || false,
        sunday: exerciseScheduleData.sunday || false,
    });
    const handleDaySelect = (day: string) => {
        setScheduledDays({...scheduledDays, ...{[day]: !scheduledDays[day]}})
    };

    const handleExpandSection = () => {
        !isExpanded && setIsExpanded(true)
    };

    const handleSaveExercise = () => {
        console.log('save exercise - ', exerciseScheduleData);
        createOrUpdateExerciseSchedule(exerciseScheduleData);
        setIsExpanded(false)
    };

    const updateExerciseRepsData = (exerciseRepsData: ExerciseReps) => {
        setExerciseScheduleData({...exerciseScheduleData, ...exerciseRepsData});
    };

    const exerciseRepsData = {
        sets: exerciseScheduleData.sets || 0,
        reps: exerciseScheduleData.reps || 0,
    };

    useEffect(()=>{
        setExerciseScheduleData({...exerciseScheduleData, ...scheduledDays})
    }, [scheduledDays]);

    useEffect(()=>{
        console.log('updated exerciseScheduleData - ', exerciseScheduleData)
    }, [exerciseScheduleData])


    return <View style={[styles.container, containerStyle]}>
        <Pressable style={[ styles.miniContainer, styles.row ]} onPress={handleExpandSection}>
            <View style={[styles.titleContent]}>
                <Text variant="paragraph2" fontWeight="500">{exercise.name.toUpperCase()}</Text>
                {isTimerShown && <TimeDisplay />}
            </View>
        </Pressable>
        {isExpanded && <View style={styles.expandedView}> 
            <View style={styles.calendarContainer}>
                <CalendarSelector scheduledDays={scheduledDays} handleDaySelect={handleDaySelect}/>
            </View>
            <View style={styles.exerciseSelector}>
                <ExerciseRepsSelector onChange={updateExerciseRepsData} values={exerciseRepsData}/>
            </View>
            <TouchableOpacity onPress={handleSaveExercise} style={styles.save}>
                <BlueCheck />
            </TouchableOpacity>
        </View>}    
    </View>
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        backgroundColor: '#F8FAFB',
        paddingBottom: 48
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
    },
    exerciseSelector: {
        alignSelf: 'center'
    },
    expandedView: {
        gap: 32
    },
    save: {
        alignSelf: 'center'
    }
})