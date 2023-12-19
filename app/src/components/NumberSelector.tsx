import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors, Text } from "../theme";
import { Input } from "react-native-elements";
import UpArrow from "../../assets/circular-up-arrow.svg"
import DownArrow from "../../assets/circular-down-arrow.svg"

type NumberSelector = {
    value?: number;
    title?: string;
    onChange: (value: number) => void;
    isArrowControlHidden?: boolean
};


export const NumberSelector = ({ value, title, onChange, isArrowControlHidden }: NumberSelector) => {
    const [val, setVal] = useState(value);
    const handleOnChange = (input:string) => {
        const n  = Number(input)
        setVal(n)
    };
    const increaseValue = () => {
        setVal(val + 1)
    };
    const decreaseValue = () => {
        setVal(val - 1)
    };

    useEffect(()=>{
        onChange(val)
    }, [val])

    return <>
        <View style={styles.container}>
            <View style={styles.numberContainer}>
                <View style={styles.inputWrapper}>
                    <Input 
                        keyboardType="number-pad"
                        value={val?.toString()}
                        onChangeText={(input)=>handleOnChange(input)}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                    />
                </View>
                {title && <Text textAlign="center" variant="paragraph2" fontWeight="500" color="gray04">{title}</Text>}
            </View>
            {!isArrowControlHidden && <View>
                <TouchableOpacity onPress={increaseValue}>
                    <UpArrow width={48} height={48} />
                </TouchableOpacity>
                <TouchableOpacity onPress={decreaseValue}>
                    <DownArrow width={48} height={48}/>
                </TouchableOpacity>
            </View>}
        </View>
    </>
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        textAlign: 'center',
        gap: 8
    },
    numberContainer: {
        width: 64,
        justifyContent: 'center'
    },
    inputWrapper: {
        width: 64,
        height: 96,
        backgroundColor: Colors.black,
        justifyContent: 'center',
        borderRadius: 10,
    },
    input: {
        color: 'white',
        fontSize: 32,
        fontWeight: '500',
    },
    inputContainer: {
        height: 48,
    }
})