import { Macros } from "../domains/foodLog/types";
import { StyleSheet, View } from "react-native";
import { Text } from "../theme";
import { StyleProp, ViewStyle, FlexStyle } from "react-native";

type MacrosProps = {
    macros: Macros,
    containerStyle?: StyleProp<ViewStyle | FlexStyle>
}

export const MacrosDisplay = ({ macros, containerStyle }: MacrosProps) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.row}>
                <Text variant="paragraph2" fontWeight="500">FAT</Text>
                <Text variant="paragraph2" fontWeight="500">{macros?.fat} G</Text>
            </View>
            <View style={styles.row}>
                <Text variant="paragraph2" fontWeight="500">PROTEIN</Text>
                <Text variant="paragraph2" fontWeight="500">{macros?.protein} G</Text>
            </View>
            <View style={styles.row}>
                <Text variant="paragraph2" fontWeight="500">CARBS</Text>
                <Text variant="paragraph2" fontWeight="500">{macros?.carbs} G</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 145,
        justifyContent: 'space-between',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
