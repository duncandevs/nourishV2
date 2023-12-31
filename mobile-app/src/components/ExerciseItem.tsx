import { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { Text } from "../theme";
import { Exercise } from "../domains/exercise/types";
import { ABBREV_DAYS, DAYS_OF_THE_WEEK, formatDisplayTime } from '../utility';
import { CheckBox } from 'react-native-elements';
import { ExerciseRepsSelector, ExerciseTimeSelector } from ".";
import { useExerciseSchedules } from "../domains/exerciseSchedule/hooks";
import { ExerciseScheduleParams } from '../domains/exerciseSchedule/services';
import { ExerciseSchedule } from '../domains/exerciseSchedule/types';
import BlueCheck from "../../assets/blue-check.svg"
import CircularDownArrow from "../../assets/circular-down-arrow.svg";

type ExerciseItemProps = {
    exerciseSchedule: ExerciseSchedule | null
    exercise: Exercise
    containerStyle?: {}
};

type TimeDisplayProps = {
    seconds: number
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

const TimeDisplay = ({ seconds }:TimeDisplayProps) => {
    const displayTime = formatDisplayTime(seconds);
    const displayColor = seconds ? "blue" : "gray02"
    return <Text variant="paragraph2" color={displayColor} fontWeight="500">{displayTime}</Text>
};

const RepsCounterDisplay = ({ sets, reps }:{sets:number, reps:number}) => {
    return <View style={[styles.row, styles.repsCounter]}>
            <View style={styles.repsWrapper}>
                <Text variant="header3" color="blue" fontWeight="500" textAlign="center">{sets || 0}</Text>
                <Text variant="paragraph3" color="blue">SETS</Text>
            </View>
            <View style={styles.repsWrapper}>
                <Text variant="header3" color="blue" fontWeight="500" textAlign="center">{reps || 0}</Text>
                <Text variant="paragraph3" color="blue">REPS</Text>
            </View>
        </View>
};

const DatesScheduled = ({ schedule }:{schedule: ExerciseSchedule}) => {
    const scheduleArray = [
        { display: "m", isShown: schedule.monday },
        { display: "t", isShown: schedule.tuesday },
        { display: "w", isShown: schedule.wednesday },
        { display:"th", isShown: schedule.thursday},
        { display: "f", isShown: schedule.friday },
        { display: "s", isShown: schedule.saturday},
        { display: "su", isShown: schedule.sunday},
    ]
    return <View style={styles.scheduledDays}>{scheduleArray?.map((item) => {
                return item.isShown && <View style={styles.scheduledDaysItem}> 
                    <Text color='white' variant='paragraph4'>{item.display}</Text> 
                </View>
            })}</View>
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


export const ExerciseItem = ({ exercise, exerciseSchedule, containerStyle }: ExerciseItemProps) => {
    const { createOrUpdateExerciseSchedule } = useExerciseSchedules();
    const isExerciseTimerShown = exercise.measurement === 'time';
    const isExerciseRepsShown = exercise.measurement === 'reps';
    const isScheduled = exerciseSchedule?.monday || exerciseSchedule?.tuesday || exerciseSchedule?.wednesday || exerciseSchedule?.thursday || exerciseSchedule?.friday || exerciseSchedule?.saturday || exerciseSchedule?.sunday

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
    const isTimerShown = !isExpanded && exercise.measurement === 'time';
    const isRepsCounterShown = !isExpanded && exercise.measurement === 'reps';
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
        createOrUpdateExerciseSchedule(exerciseScheduleData);
        setIsExpanded(false)
    };

    const updateExerciseRepsData = (exerciseRepsData: ExerciseReps) => {
        setExerciseScheduleData({...exerciseScheduleData, ...exerciseRepsData});
    };

    const updateExerciseTimeData = (timeInSeconds: number) => {
        setExerciseScheduleData({...exerciseScheduleData, ...{time_in_seconds: timeInSeconds}});
    }

    const exerciseRepsData = {
        sets: exerciseScheduleData.sets || 0,
        reps: exerciseScheduleData.reps || 0,
    };

    useEffect(()=>{
        setExerciseScheduleData({...exerciseScheduleData, ...scheduledDays})
    }, [scheduledDays]);


    return <View style={[styles.container, containerStyle]}>
        <Pressable style={[ styles.miniContainer, styles.row ]} onPress={handleExpandSection}>
            <View style={[styles.titleContent]}>
                <Text variant="paragraph2" fontWeight="500">{exercise.name.toUpperCase()}</Text>
                {isScheduled &&
                    <View>
                        {isTimerShown && <TimeDisplay seconds={exerciseScheduleData.time_in_seconds || 0}/>}
                        {isRepsCounterShown && <RepsCounterDisplay reps={exerciseRepsData.reps} sets={exerciseRepsData.sets} />}
                    </View>
                }
                {!isScheduled && 
                    <View>
                        {!isExpanded && <CircularDownArrow width={24} height={24}/>}
                    </View>  
                }
            </View>
        </Pressable>
        <View>
            <DatesScheduled schedule={exerciseScheduleData}/>
        </View>
        {isExpanded && <View style={styles.expandedView}> 
            <View style={styles.calendarContainer}>
                <CalendarSelector scheduledDays={scheduledDays} handleDaySelect={handleDaySelect}/>
            </View>
            <View style={styles.exerciseSelector}>
                {isExerciseRepsShown && <ExerciseRepsSelector 
                    onChange={updateExerciseRepsData} 
                    values={exerciseRepsData}
                />}
                {isExerciseTimerShown && <ExerciseTimeSelector 
                    onChange={updateExerciseTimeData} 
                    timeInSeconds={Number(exerciseScheduleData.time_in_seconds)}
                />}
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
    },
    miniContainer: {
        width: '100%',
        padding: 16,
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
    },
    titleContent: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    calendarContainer: {
        alignSelf: 'center',
        margin: 16,
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
        gap: 24,
        paddingBottom: 24
    },
    save: {
        alignSelf: 'center'
    },
    repsWrapper: {
        alignItems:'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    repsCounter: {
        gap: 12
    },
    scheduledDays: {
        flexDirection: 'row',
        gap: 8,
        paddingLeft: 16,
        paddingBottom: 16
    },
    scheduledDaysItem: {
        width: 32,
        height: 32,
        backgroundColor: 'black',
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 2
    }
})