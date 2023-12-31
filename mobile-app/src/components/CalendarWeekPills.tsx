import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "../theme";
import CalendarSvg from "../../assets/calendar-svg.svg";
import { useCalendar } from "../domains/calendar/hooks";
import { DayOfWeek } from "../domains/calendar/types";

type CalendarPillProps = {
    date: string;
    dayString:string;
    handleOnPress: (date:string) => void;
    disabled: boolean;
    highlighted: boolean;
};

type CalendarIconPillProps = {
    handleOnPress: () => void;
};

type CalendarWeekPillsProps = {
    handleCalendarIconPress: () => void;
    handleCalendarDayPress: (date:string) => void;
    disableFutureDates?: boolean
}

const CalendarDayPill = ({ dayString, date, handleOnPress, disabled, highlighted }: CalendarPillProps) => {
    const { selectedDate } = useCalendar();
    let backgroundStyles = {} as Record<string, string>;
    let fontColor = 'white' as 'white' | 'black';

    if(disabled){
        backgroundStyles['backgroundColor'] = '#D9D9D9';
    } else if(highlighted){
        backgroundStyles['backgroundColor'] = '#C3FF76';
        fontColor = "black";
    }

    const handlePress = () => {
        handleOnPress(date)
    };
    const isSelected = selectedDate === date
    return (
        <View>
            <TouchableOpacity disabled={disabled} style={[styles.pill, backgroundStyles]} onPress={handlePress}>
                <Text variant="paragraph4" color={fontColor}>{dayString}</Text>
            </TouchableOpacity>
        </View>
    );
};

const CalendarIconPill = ({ handleOnPress }: CalendarIconPillProps) => {
    return (
        <TouchableOpacity style={[styles.pill, styles.calendarIcon]} onPress={handleOnPress}>
            <CalendarSvg color="white"/>
        </TouchableOpacity>
    );
}


export const CalendarWeekPills = ({ handleCalendarIconPress, handleCalendarDayPress, disableFutureDates=false}: CalendarWeekPillsProps) => {
    const { daysOfTheWeekMap, daysOfTheWeekArray, todaysDayOfTheWeek, updateSelectedDate } = useCalendar();

    const handleDatePress = (date:string) => {
        handleCalendarDayPress(date);
        updateSelectedDate(date);
    };

    return (
        <View style={styles.calendarContainer}>
            <CalendarIconPill handleOnPress={handleCalendarIconPress}/>
            {daysOfTheWeekArray.map((fullDay: DayOfWeek) => {
                const highlighted = fullDay === todaysDayOfTheWeek;
                const dayString = fullDay.substring(0, 3);
                const isDisabled = disableFutureDates && new Date(daysOfTheWeekMap[todaysDayOfTheWeek]) < new Date(daysOfTheWeekMap[fullDay]);
                const date = daysOfTheWeekMap[fullDay];
                return <View key={fullDay}>
                    <CalendarDayPill 
                        date={date} 
                        dayString={dayString} 
                        handleOnPress={handleDatePress} 
                        highlighted={highlighted} 
                        disabled={isDisabled}
                    />
                </View>
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    pill: {
        height: 60,
        width: 40,
        borderRadius: 10,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    calendarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    calendarIcon: {
        backgroundColor: '#246EC4'
    }
});