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
    MealsDisplay,
    EditMacrosBottomSheet
} from "../components";

import { todaysDateRegular, formatDateHeader } from '../utility/dates';
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
    const [isEditMacrosVisible, setIsMacrosVisible] = useState(false);
    const goToSearchScreen = () => {
        navigation.navigate('SearchScreen');
    };
    const goToCalendarScreen = () => {
        navigation.navigate('Calendar');
    };
    const handleDaySelect = (date: string) => {
        setDate(date);
    };
    const dateHeader = formatDateHeader(date)?.toUpperCase();

    const onEditMacrosVisibility = () => {
        setIsMacrosVisible(!isEditMacrosVisible)
    };

    useEffect(()=>{
        if(mealCalories){
           const result =  Object.keys(mealCalories)?.map(key => ({title: key, stat: mealCalories[key]}));
           setMealStats(result);
        }
    }, [mealCalories]);

    return (    
        <View style={styles.container}>
            <EditMacrosBottomSheet isVisible={isEditMacrosVisible} onClose={onEditMacrosVisibility} startingValue={user?.calorie_target}/>
            <ScrollView> 
                <View style={[styles.gutter, styles.calendarHeader]}>
                    <View style={styles.header}>
                        <View>
                            <Text variant="header1">Hi,</Text>
                            <Text variant='header1'>{user?.name?.split(' ')[0]}</Text>
                        </View>
                        <AddMealButton handleOnPress={goToSearchScreen} />
                    </View>  
                    <Text marginBottom='m' variant='header3' color="gray03">{dateHeader}</Text>       
                    <View>
                        <CalendarWeekPills 
                            handleCalendarIconPress={goToCalendarScreen} 
                            handleCalendarDayPress={handleDaySelect}
                        />
                    </View>
                </View>
                <View style={styles.spacing}></View>
                <View>
                    <CaloriesHomeDisplay calories={macros?.calories} target={user?.calorie_target} handleEdit={onEditMacrosVisibility}/>
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
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white'
    },
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
});