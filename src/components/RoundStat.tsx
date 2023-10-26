import { View, ImageBackground, StyleSheet } from "react-native";
import { Text } from "../theme";
import { useEffect, useState } from "react";

type StatProps = {
    title: string,
    stat: number
}

export const RoundStat = ({ title, stat }: StatProps) => {
    const [gradient, setGradient] = useState(null);

    useEffect(()=>{
        setGradient(stat === 0 ? require('../../assets/round-gradient-light.png') : require('../../assets/round-gradient-dark.png') )
    }, [stat])

    return (
        <View style={styles.statContainer}>
            {gradient && <>
                <ImageBackground source={gradient} style={styles.outerCircle}>
                    <View style={styles.innerCircle}>
                        <Text variant="paragraph3">{stat}</Text>
                    </View>
                </ImageBackground> 
                <Text variant="paragraph3" style={styles.statTitle}>{title}</Text>
            </>}
        </View>
    )};

export const RoundStats = ({ data }) => {
    return (
        <View>
            <View style={styles.statsList}>
                {data.map((item)=> <RoundStat key={item.title} title={item.title} stat={item.stat} />)}
            </View>
        </View>
    )};

const styles = StyleSheet.create({
    statContainer:{
        width: 'auto',
        maxWidth: 72,
        alignItems: 'center',
        margin: 8
    },
    outerCircle: {
        width: 72,
        height: 72,
        borderRadius: 72,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    innerCircle: {
        backgroundColor: 'white',
        width: 60,
        height: 60,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    statsList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignSelf: 'center'
    },
    statTitle: {
        marginTop: 8
    }
})