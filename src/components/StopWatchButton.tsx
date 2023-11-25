import {View, StyleSheet, TouchableOpacity } from "react-native";
import { Text
 } from "../theme";
import RightArrowIcon from '../../assets/right-arrow.svg'
import StopWatchIcon from '../../assets/stop-watch-icon.svg'

type StopWatchButtonProps = {
    onPress: ()=>void;
    containerStyle?: {}
}

export const StopWatchButton = ({ onPress, containerStyle }: StopWatchButtonProps) => {
    return <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress}>
        <StopWatchIcon width={26} height={30} fill="white"/>
        <Text variant="paragraph2" color="white">STOP-WATCH</Text>
        <RightArrowIcon width={26} height={21} fill="white"/>
    </TouchableOpacity>
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FF4C00',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 64,
        borderRadius: 10,
        padding: 20
    }
})