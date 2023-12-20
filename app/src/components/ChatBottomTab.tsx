import { Image, View } from "react-native";
import { StyleSheet } from "react-native";
import { Colors, Text } from "../theme";
import { Input } from "react-native-elements";

export const ChatBottomTab =  ({ navigation }) => {
    const goToChatScreen = () => {
        navigation.navigate('ChatScreen')
    }
    return <View style={styles.container}>
        <View style={styles.row}>
            <Image source={require('../../assets/ara-profile-mini.png')} style={styles.aiImg}/>
            <Input containerStyle={styles.textInputContainer} inputContainerStyle={{borderBottomWidth:0}} inputStyle={{color: 'white'}}/>
            <Text color="white" onPress={goToChatScreen}>GO</Text>
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
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding:16,
        paddingTop: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    aiImg: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    textInputContainer: {
        width: '70%',
        height: 40,
        borderRadius: 20,
        backgroundColor: '#272727',
        textDecorationLine: 'none',
        borderWidth: 0,
    }
})