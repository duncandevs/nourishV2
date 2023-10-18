import { useEffect, useState } from 'react';
import {View, ScrollView, StyleSheet } from 'react-native';
import { useAppState } from "../state";
import {RootStackParamList} from "./types";
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from '../theme';
import { 
    AddMealButton, 
    CalendarWeekPills, 
    CaloriesHomeDisplay, 
    MacrosDisplay,
    RoundStats,
    MealsDisplay
} from "../components";
import { Macros } from '../domains/foodLog/types';
import { todaysDateRegular, getDaysOfCurrentWeek, formatDateHeader } from '../utility/dates';
import { useFoodLogMacrosByDate, useFoodLogMealCaloriesByDate } from '../domains/foodLog/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

type MealStat = { title: string; stat: any; }

type MealStats = MealStat[];

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
    const { 
        user: { data: user },
    } = useAppState();
    const [ date, setDate] = useState(todaysDateRegular);
    const [mealStats, setMealStats] = useState<MealStats>([]);
    const { macros } = useFoodLogMacrosByDate({ date });
    const { mealCalories } = useFoodLogMealCaloriesByDate({ date });
    
    const goToSearchScreen = () => {
        navigation.navigate('SearchScreen');
    };

    const goToCalendarScreen = () => {
        navigation.navigate('Calendar');
    };
    const handleDaySelect = (date: string) => {
        setDate(date);
    };
    const dateHeader = formatDateHeader(date)?.toUpperCase()

    useEffect(()=>{
        if(mealCalories){
           const result =  Object.keys(mealCalories)?.map(key => ({title: key, stat: mealCalories[key]}));
           setMealStats(result);
        }
    }, [mealCalories]);

    return (
        <SafeAreaView style={{height: '100%', backgroundColor: 'white'}}>
            <ScrollView> 
                <View style={[styles.gutter, styles.calendarHeader]}>
                    <View style={styles.header}>
                        <View>
                            <Text variant="header1">Hi,</Text>
                            <Text variant='header1'>{user?.name?.split(' ')[0]}</Text>
                        </View>
                        <AddMealButton handleOnPress={goToSearchScreen} />
                    </View>  
                    <Text marginBottom='m' variant='paragraph3'>{dateHeader}</Text>       
                    <View>
                        <CalendarWeekPills 
                            handleCalendarIconPress={goToCalendarScreen} 
                            handleCalendarDayPress={handleDaySelect}
                        />
                    </View>
                </View>
                <View style={styles.spacing}></View>
                <View>
                    <CaloriesHomeDisplay calories={macros?.calories} target={1700} handleEdit={()=>console.log('handle edit')}/>
                </View>
                <View style={styles.spacing}></View>
                <RoundStats data={mealStats} />
                <View style={styles.macros}>
                    <MacrosDisplay macros={macros} />
                </View>
                <View>
                    <MealsDisplay date={date} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },

    gutter: {
        padding: 14
    },
    calendarHeader: {
        padding: 20
    },
    macros: {
        marginTop: 36,
        marginBottom: 36,
        marginLeft: 48,
        marginRight: 48
    },
    spacing:{
        margin: 16
    }
})