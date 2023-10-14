import { Macros } from "../domains/foodLog/types";
import { StyleSheet, View } from "react-native";
import { Text } from "../theme";

type MacrosProps = {
    macros: Macros
}

export const MacrosDisplay = ({ macros }: MacrosProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text variant="paragraph2">FAT</Text>
                <Text variant="paragraph2">{macros.fat} G</Text>
            </View>
            <View style={styles.row}>
                <Text variant="paragraph2">PROTEIN</Text>
                <Text variant="paragraph2">{macros.protein} G</Text>
            </View>
            <View style={styles.row}>
                <Text variant="paragraph2">CARBS</Text>
                <Text variant="paragraph2">{macros.carbs} G</Text>
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
