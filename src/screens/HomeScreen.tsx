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
import FoodLogsService from '../domains/foodLog/services';
import { todaysDateRegular } from '../utility';
import { useFoodLogMacrosByDate, useFoodLogMealCaloriesByDate } from '../domains/foodLog/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
    const [ date, setDate] = useState(todaysDateRegular)
    const goToSearchScreen = () => {
        navigation.navigate('SearchScreen');
    };
    const { 
        user: { data: user },
    } = useAppState();
    const { macros } = useFoodLogMacrosByDate({ date });
    const { mealCalories } = useFoodLogMealCaloriesByDate({ date });

    const mealStats = Object.keys(mealCalories).map(key => ({title: key, stat: mealCalories[key]}));

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

                    <View>
                        <CalendarWeekPills />
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
                    <MealsDisplay />
                </View>
                {/* {foodLogIsLoading && <Text>loading food...</Text>}
                {foodLogs?.map((log)=> {
                    return <View key={`food-log-${log.id}`} style={{marginBottom:20}}>
                        <Text>{log.date}</Text>
                        <Text>{log.meal_type}</Text>
                        <Text>{log.quantity}</Text>
                        <Text>{log.food?.name}</Text>
                        <Text>{log.food?.calories}</Text>
                        <Text>{log.food?.fat}g</Text>
                        <Text>{log.food?.carbs}g</Text>
                        <Text>{log.food?.protein}g</Text>
                    </View>
                })} */}
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 36,
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