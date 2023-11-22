import { TouchableOpacity, View } from "react-native"
import { Text } from "../theme"
import { CalendarWeekPills } from "../components";
import { StyleSheet } from "react-native";

export const FitnessScreen = () => {
    const handleDaySelect = (day:string) => {
        console.log(day);
    };

    const goToCalendarScreen = () => {
        console.log('go to calendar screen');
    };

    const addNewExercise = async () => {
        console.log('adding new exercise')
    };
    return <View style={styles.container}>
        <View style={[styles.row]}>
            <CalendarWeekPills 
                handleCalendarIconPress={goToCalendarScreen} 
                handleCalendarDayPress={handleDaySelect}
            />
        </View>
        <View>
            <TouchableOpacity onPress={addNewExercise}>
                <Text>Add Exercise</Text>
            </TouchableOpacity>
        </View>
    </View>
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 32,
        height: '100%',
        backgroundColor: 'white',
    },
    row: {
        padding: 16
    }
})