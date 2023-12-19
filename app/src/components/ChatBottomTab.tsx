import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Colors, Text } from "../theme";

export const ChatBottomTab =  ({ navigation }) => {
    const goToChatScreen = () => {
        navigation.navigate('ChatScreen')
    }
    return <View style={styles.container}>
        <View style={styles.row}>
            <Text color="white" variant="header3">ARA</Text>
            <Text color="white" onPress={goToChatScreen}>GO TO CHAT</Text>
        </View>
    </View>
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        zIndex: 1000,
        width: '100%',
        height: 96,
        backgroundColor: Colors.black,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding:16
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})