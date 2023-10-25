import { StyleSheet, View, ImageBackground } from "react-native";
import { Text } from "../theme";

type CaloriesHomeDisplayProps = {
    calories: number;
    target: number;
    handleEdit: () => void;
};

export const CaloriesHomeDisplay = ({ calories, target, handleEdit }: CaloriesHomeDisplayProps) => {
    return (
        <ImageBackground 
            source={require('../../assets/gradient-box.png')} 
            resizeMode="cover" // or "contain", "stretch", etc.
            style={styles.imageBackground}
        >
            <Text style={styles.editLink} variant="link1" color="gray02" onPress={handleEdit}>edit</Text>
            <View style={[styles.row, styles.container]}>
                <Text variant="header3" style={styles.caloriesText} color="white">CALORIES</Text>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text variant="display1" color="alert">{calories || 0}</Text>
                        {target && <Text variant="display2" style={styles.target} color="white">{target}</Text>}
                        {!target && <Text variant="display2" style={styles.target} color="white">-</Text>}
                    </View>
                    <Text variant="header3" style={styles.targetText} color="white">TARGET</Text>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        padding:12,
    },
    container: {
        justifyContent: 'space-around',
    },
    row: {
        flexDirection: 'row'
    },
    column: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    editLink: {
        marginLeft: 'auto'
    },
    caloriesText: {
        alignContent: 'center',
        marginTop: 36
    },
    target: {
        alignSelf: 'flex-end',
    },
    targetText: {
        marginLeft: 8,
        marginTop: 'auto',
        marginBottom: 8
    }
})