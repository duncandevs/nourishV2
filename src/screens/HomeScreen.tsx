import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Text } from "../theme"

export const HomeScreen  = ({ navigation }) => {
    const goToNutritionScreen = () => {
        navigation.navigate("NutritionScreen");
    };
    const goToFitnessScreen = () => {
        navigation.navigate("FitnessScreen");
    }
    return <View style={styles.summary}>
        <TouchableOpacity onPress={goToFitnessScreen}>
            <Text>Fitness</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToNutritionScreen}>
            <Text>Nutrition</Text>
        </TouchableOpacity>
    </View>
};

const styles = StyleSheet.create({
    summary: {
        gap: 36
    }
})