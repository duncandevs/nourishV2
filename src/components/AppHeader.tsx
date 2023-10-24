import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "../theme";
import ProfileIcon from "../../assets/profile.svg";

export const AppHeader = ({ navigation }) => {
    const goToProfile = () => {
        navigation.navigate('Profile');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.icon} onPress={goToProfile}>
                <ProfileIcon width={24} height={24}/>
            </TouchableOpacity>
            <View style={{margin: 'auto', width: '100%', paddingRight: 48}}>
                <Text style={styles.title} variant="paragraph2">nourish</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 40,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 24,
        paddingRight: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#E3E5E6',

    },
    title: {
        textAlign: 'center',
        margin: 'auto'
    },
    icon: {},
})
