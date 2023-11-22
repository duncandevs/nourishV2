import { TouchableOpacity, View } from "react-native"
import { Text } from "../theme"

export const HomeScreen  = ({ navigation }) => {
    const goToNutritionScreen = () => {
        navigation.navigate("NutritionScreen");
    };
    return <View>
        <TouchableOpacity onPress={goToNutritionScreen}>
            <Text>Nutrition</Text>
        </TouchableOpacity>
    </View>
}