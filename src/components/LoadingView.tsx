import { Image, StyleSheet, View } from "react-native";
const ColoredDots = require("../../assets/colored-dots.gif");

export const LoadingView = () => {
    return <View style={styles.container}>
        <Image source={ColoredDots} style={styles.image}/>
    </View>
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        marginBottom: 100,
        width: 100,
        height: 100
    }
})