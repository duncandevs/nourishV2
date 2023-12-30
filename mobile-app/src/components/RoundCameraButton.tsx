import { TouchableOpacity } from 'react-native-gesture-handler';
import { Pressable, StyleSheet } from 'react-native';
import { Text } from '../theme';
import CameraSvg from '../../assets/camera-icon.svg';


type RoundCameraButtonProps = {
    title: string,
    onPress: () => void
};

export const RoundCameraButton = ({ title, onPress }: RoundCameraButtonProps) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <TouchableOpacity style={styles.roundContainer}>
                <CameraSvg />
            </TouchableOpacity>
            <Text textAlign='center' style={styles.title}>{title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: '10%',
        alignItems: 'center',
        gap: 8
    },
    roundContainer: {
        width: 60,
        height: 60,
        borderRadius: 60,
        backgroundColor: '#212121',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontWeight: '500',
    }
})