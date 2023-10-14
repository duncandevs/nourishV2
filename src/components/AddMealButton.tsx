import { StyleSheet, View, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import {RootStackParamList} from "../screens/types";

import ForkKnifeSvg from '../../assets/fork-knife.svg';
import { Text } from "../theme";


type AddMealButtonProps = {
  handleOnPress: () => void;
};

export const AddMealButton = ({ handleOnPress }: AddMealButtonProps) => {
    return (
        <TouchableOpacity onPress={handleOnPress}>
            <View style={styles.circleContainer}>
                <View style={styles.svg}>
                    <ForkKnifeSvg />
                </View>
            </View>
            <Text style={styles.title}>add meal</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    circleContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        borderRadius: 50,
        width: 50,
        height: 50
    },
    svg: {
        alignItems: 'center',
        alignSelf: 'center',
        padding: 0,
        margin: 0,
    },
    title: {
        marginTop: 10,
        textAlign: 'center'
    }
})