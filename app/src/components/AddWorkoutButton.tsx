import { StyleSheet, View, TouchableOpacity } from "react-native";

import TreadmillIcon from '../../assets/treadmill-icon.svg';
import { Text } from "../theme";


type AddWorkoutButtonProps = {
  handleOnPress: () => void;
};

export const AddWorkoutButton = ({ handleOnPress }: AddWorkoutButtonProps) => {
    return (
        <TouchableOpacity onPress={handleOnPress}>
            <View style={styles.circleContainer}>
                <View style={styles.svg}>
                    <TreadmillIcon width={50} height={50}/>
                </View>
            </View>
            <Text style={styles.title}>add workout</Text>
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