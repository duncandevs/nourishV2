import { View, ImageBackground, StyleSheet } from "react-native";
import { Colors, Text } from "../theme";
import { useEffect, useState } from "react";

type StatProps = {
    title: string,
    stat: number,
    color: string //COLOR AS HEX
}

export const RoundStat = ({ title, stat, color }: StatProps) => {
    const colorStyle = { backgroundColor: color || Colors.gray04};

    return (
        <View style={styles.statContainer}>
            <View style={[styles.outerCircle, colorStyle]}>
                <View style={styles.innerCircle}>
                    <Text variant="paragraph3">{stat}</Text>
                </View>
            </View> 
            <Text variant="paragraph3" style={styles.statTitle}>{title}</Text>
        </View>
    )};

export const RoundStats = ({ data }) => {
    const COLORS = [
        "#A1CDFF",
        "#FFC876",
        "#00A59B",
        "#FF7676"
    ]
    return (
        <View>
            <View style={styles.statsList}>
                {data.map((item, idx) => {
                    const color = COLORS[idx]
                    return <RoundStat color={color} key={item.title} title={item.title} stat={item.stat} />
                })}
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