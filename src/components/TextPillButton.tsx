import { StyleSheet, TouchableHighlight } from "react-native";
import { Text } from "../theme";

type TextPillButtonProps = {
    title: string;
    handleOnPress: () => void;
    active: boolean
};

export const TextPillButton = ({ title, handleOnPress, active }: TextPillButtonProps) => {
    const pillBackgroundStyle = active ? styles.active : styles.inActive;
    const textColor = active ? "white" : "black"
    return (
        <TouchableHighlight style={[ pillBackgroundStyle, styles.container ]} onPress={handleOnPress}>
            <Text variant="paragraph4" color={textColor}>{title}</Text>
        </TouchableHighlight>
    )
};

const styles = StyleSheet.create({
    active: {
        backgroundColor: 'black',
    },
    inActive: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black'
    },
    container: {
        width: 75,
        height: 27,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4
    },
})