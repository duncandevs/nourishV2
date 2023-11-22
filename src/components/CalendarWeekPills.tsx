import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "../theme";
import CalendarSvg from "../../assets/calendar-svg.svg";
import { getDaysOfCurrentWeek, getDayOfTheWeek } from "../utility/dates";

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
    }

    return (
        <TouchableOpacity disabled={disabled} style={[styles.pill, backgroundStyles]} onPress={handlePress}>
            <Text variant="paragraph4" color={fontColor}>{dayString}</Text>
        </TouchableOpacity>
    );
};

const CalendarIconPill = ({ handleOnPress }: CalendarIconPillProps) => {
    return (
        <TouchableOpacity style={[styles.pill, styles.calendarIcon]} onPress={handleOnPress}>
            <CalendarSvg />
        </TouchableOpacity>
    );
}


export const CalendarWeekPills = ({ handleCalendarIconPress, handleCalendarDayPress, disableFutureDates=false}: CalendarWeekPillsProps) => {
    const daysOfTheWeekMap = getDaysOfCurrentWeek();
    const daysOfTheWeekArray = Object.keys(daysOfTheWeekMap);
    const dayOfTheWeek = getDayOfTheWeek().toLowerCase();

    return (
        <View style={styles.calendarContainer}>
            <CalendarIconPill handleOnPress={handleCalendarIconPress}/>
            {daysOfTheWeekArray.map((fullDay) => {
                const highlighted = fullDay === dayOfTheWeek;
                const dayString = fullDay.substring(0, 3);
                const isDisabled = disableFutureDates && new Date(daysOfTheWeekMap[dayOfTheWeek]) < new Date(daysOfTheWeekMap[fullDay]);
                const date = daysOfTheWeekMap[fullDay];
                return <View key={fullDay}>
                    <CalendarDayPill 
                        date={date} 
                        dayString={dayString} 
                        handleOnPress={handleCalendarDayPress} 
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