import { StyleSheet, View } from "react-native";
import { NumberSelector } from "./NumberSelector";
import { useEffect, useState } from "react";

type ExerciseRepsOptions = {
    reps: number;
    sets: number;
};

type ExerciseRepsSelectorProps = {
    values: ExerciseRepsOptions;
    onChange: (values: ExerciseRepsOptions) => void
}

export const ExerciseRepsSelector = ({ values, onChange }: ExerciseRepsSelectorProps) => {
    const [ data, setData ] = useState<ExerciseRepsOptions>(values)
    
    const updateReps = (value: number) => {
        setData({...data, ...{reps: value}});
        onChange({...data, ...{reps: value}});
    };

    const updateSets = (value: number) => {
        setData({...data, ...{sets: value}})
        onChange({...data, ...{sets: value}});
    };

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