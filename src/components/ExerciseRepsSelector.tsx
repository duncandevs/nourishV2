import { StyleSheet, View } from "react-native";
import { NumberSelector } from "./NumberSelector";
import { useEffect, useState } from "react";

type ExerciseRepsOptions = {
    reps: number;
    sets: number;
};

type ExerciseRepsSelectorProps = {
    values?: ExerciseRepsOptions | null;
    onChange: (values: ExerciseRepsOptions) => void
}

export const ExerciseRepsSelector = ({ values, onChange }: ExerciseRepsSelectorProps) => {
    console.log('exercise values - ', values)
    const [ data, setData ] = useState<ExerciseRepsOptions>(values || {
        reps: 0,
        sets: 0
    })
    
    const updateReps = (value: number) => {
        setData({...data, reps: value})
    };

    const updateSets = (value: number) => {
        setData({...data, sets: value})
    }

    useEffect(()=>{
        console.log('data changes to - ', data)
        onChange(data)
    }, [data])

    return <View style={styles.container}>
        <NumberSelector title={"sets"} onChange={(value)=>updateSets(value)} value={data.sets} />
        <NumberSelector title={"reps"} onChange={(value)=>updateReps(value)} value={data.reps} />
    </View>
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 36
    }
});