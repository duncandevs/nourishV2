import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from 'react-native-calendars';
import { Text } from "../theme";
import FoodLogsService from "../domains/foodLog/services";
import { useAppState } from "../state";
import { 
    FoodLog, 
    Macros,
    FoodLogsDateMap, 
    Month,
    Day,
    FoodLogsAvgMacros,
} from "../domains/foodLog/types";
import { MacrosDisplay } from "../components";
import { ScrollView } from "react-native-gesture-handler";
import { getRoundedMacros } from "../utility";


export const CalendarScreen = () => {
    const { user: { data: userData } } = useAppState();
    const [ selectedDate, setSelectedDate] = useState<Day>({
        "dateString": '',
        "day": null,
        "month": null,
        "timestamp": null,
        "year": null,
    });
    const [ selectedMonth, setSelectedMonth] = useState<Month>({
        "dateString": '',
        "day": null,
        "month": null,
        "timestamp": null,
        "year": null,
    });
    const [ foodLogsDateMap, setFoodLogsDateMap ] = useState<FoodLogsDateMap>({});
    const [ dailyAvgMacros, setDailyAvgMacros ] = useState<FoodLogsAvgMacros>({});
    const [ monthlyAvgMacros, setMonthlyAvgMacros] = useState<Macros | null>(null);
    const [ selectedDayLogs, setSelectedDayLogs ] = useState<FoodLog[]>([]);
    const handleMonthChange = (month: Month) => setSelectedMonth(month)
    const numOfDaysLogged = Object.keys(foodLogsDateMap).length;

    // replace with UseReducedMonthlyFoodLogs
    useEffect(()=>{
       FoodLogsService.fetchMonthlyFoodLogsByUserId({ userId: userData?.id, month: selectedMonth.month, year: selectedMonth.year }).then(({data, error})=>{
            if(data) {
                const reducedData = FoodLogsService.reduceMonthlyFoodLogsByDates({ foodLogs: data });
                setFoodLogsDateMap(reducedData)
            };
       });
    }, [userData, selectedMonth]);

    // replace with UseSelectedMonthDayFoodLogs
    useEffect(()=>{
        if(foodLogsDateMap) setSelectedDayLogs(foodLogsDateMap[selectedDate.dateString]);
    }, [selectedDate, foodLogsDateMap]);

    useEffect(()=>{
        const result = FoodLogsService.getAverageMacrosPerDay({ foodLogsDateMap: foodLogsDateMap});
        setDailyAvgMacros(result);
    }, [foodLogsDateMap]);

    useEffect(()=>{
        const result = FoodLogsService.getAverageMacrosPerMonth({dailyAverages: dailyAvgMacros });
        setMonthlyAvgMacros(result);
    }, [dailyAvgMacros])

    const selectedDateString = selectedDate?.dateString
    const title = selectedDateString ? `On ${selectedDate?.month}/${selectedDate?.day} you logged` : 'This month you averaged';
    const displayMacros = getRoundedMacros({
        calories: selectedDateString ?  dailyAvgMacros[selectedDateString]?.calories || 0 : monthlyAvgMacros?.calories || 0,
        fat: selectedDateString ?  dailyAvgMacros[selectedDateString]?.fat || 0 : monthlyAvgMacros?.fat || 0,
        protein: selectedDateString ?  dailyAvgMacros[selectedDateString]?.protein || 0 : monthlyAvgMacros?.protein || 0,
        carbs: selectedDateString ?  dailyAvgMacros[selectedDateString]?.carbs || 0 : monthlyAvgMacros?.carbs || 0,
    })

    return <ScrollView style={{backgroundColor: 'white'}}>
        <View style={[styles.screen]}>
            {<View style={[styles.row, styles.container, styles.daysLogged]}>
                <Text variant='display1'>{numOfDaysLogged} </Text>
                <Text variant="paragraph2">days logged</Text>
            </View>}
            <View style={styles.calendar}>
                <Calendar 
                    onDayPress={day => setSelectedDate(day)}
                    onMonthChange={month => handleMonthChange(month)}
                />
            </View>
            <View style={styles.container}>
                <Text marginLeft="m">{title}</Text>
            </View>
            <View style={[styles.row, styles.calorieWrapper, styles.container]}>
                <Text variant="display3" color="white">{displayMacros.calories}</Text>
                <Text variant="header3" style={styles.caloriesHeader} color="white">CALORIES</Text>
            </View>
            <View style={[styles.container]}>
                <Text variant="paragraph4" marginLeft="m">MACROS</Text>
                <MacrosDisplay macros={displayMacros} containerStyle={styles.macros}/>
            </View>
        </View>
    </ScrollView>
};

const styles = StyleSheet.create({
    screen:{
        backgroundColor: 'white',
        height: '100%',
        paddingBottom: 32
    },
    container: {
        padding: 16
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    daysLogged: {
        padding: 32
    },
    calendar: {
        margin: 16,
        marginBottom: 32
    },
    macros: {
        margin: 32
    },
    caloriesHeader: {
        marginLeft: 16
    },
    calorieWrapper: {
        backgroundColor: '#246EC4',
        paddingLeft: 32
    }
})