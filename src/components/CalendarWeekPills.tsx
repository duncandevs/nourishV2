import { StyleSheet, View } from "react-native";
import { Text } from "../theme";
import CalendarSvg from "../../assets/calendar-svg.svg"

type CalendarPillProps = {
    day:string;
    handleOnPress: () => void;
};

const CalendarDayPill = ({ day, handleOnPress }: CalendarPillProps) => {
    const highlighted = day === 'Thu';
    const highlightedStyle = highlighted ? { backgroundColor: '#C3FF76', color: 'black'} : null;
    const highlightedFontColor = highlighted ? "black" : "white";
    return (
        <View style={[styles.pill, highlightedStyle]}>
            <Text variant="paragraph4" color={highlightedFontColor}>{day}</Text>
        </View>
    );
};

const CalendarIconPill = () => {
    return (
        <View style={[styles.pill, styles.calendarIcon]}>
            <CalendarSvg />
        </View>
    );
}


export const CalendarWeekPills = () => {
    const calendarDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
        <View style={styles.calendarContainer}>
            <CalendarIconPill />
            {calendarDays.map((day) => {
                return <CalendarDayPill day={day} handleOnPress={()=>console.log('pressed')} />
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