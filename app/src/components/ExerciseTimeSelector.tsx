import { StyleSheet, View } from "react-native";
import { NumberSelector } from "./NumberSelector";
import { useEffect, useState } from "react";
import { 
    getHoursFromSeconds,
    getMinutesFromSeconds,
    getSeconds,
} from "../utility";

type ExerciseTimeSelectorProps = {
    onChange: (totalTimeInSeconds: number) => void;
    timeInSeconds: number;
};

export const ExerciseTimeSelector = ({ onChange, timeInSeconds }: ExerciseTimeSelectorProps) => {
    const [ timeData, setTimeData ] = useState(timeInSeconds)
    // Convert initial time in seconds to hours, minutes, and seconds
    const initialHours = getHoursFromSeconds(timeInSeconds);
    const initialMinutes = getMinutesFromSeconds(timeInSeconds);
    const initialSeconds = getSeconds(timeInSeconds);

    const [hours, setHours] = useState(initialHours);
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);

    const handleUpdateTime = () => {
        // Convert hours, minutes, and seconds to total time in seconds
        const totalTimeInSeconds =(Number(hours) * 3600) + (Number(minutes) * 60) + Number(seconds);
        setTimeData(totalTimeInSeconds);
    };

    useEffect(() => {
        onChange(timeData);
    }, [timeData]);

    useEffect(() => {
        handleUpdateTime()
    }, [hours, minutes, seconds]);


    return (
        <View style={styles.container}>
            <NumberSelector onChange={setHours} title="hr" value={hours} isArrowControlHidden/>
            <NumberSelector onChange={setMinutes} title="min" value={minutes} isArrowControlHidden/>
            <NumberSelector onChange={setSeconds} title="sec" value={seconds} isArrowControlHidden/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 36
    },
});