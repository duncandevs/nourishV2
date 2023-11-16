import { View } from "react-native";
import { Text } from "../theme";
import SquareMinusIcon from "../../assets/square-minus-icon.svg";
import SquarePlusIcon from "../../assets/square-plus-icon.svg";
import { StyleSheet } from "react-native";
import { Input } from "react-native-elements";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

type Unit =  "serving" | "cup" | "ounces" | "grams" | "pound" | "liter" | "gallon" | "teaspoon" | "tablespoon";

const UNITS = [
    "serving",
    "cup",
    "ounces",
    "grams",
    "pound",
    "liter",
    "gallon",
    "teaspoon",
    "tablespoon"
] as Unit[];  // 'as const' ensures that TypeScript treats the array as a tuple of literals


type ServingUnit = {
    labelField: Unit;
    valueField: Unit;
};

// Function to convert UNITS array into data format
const convertUnitsToData = (unitsArray: Unit[]): ServingUnit[] => {
    return unitsArray.map(unit => ({
        labelField: unit,
        valueField: unit
    }));
};

// Using the function to create data array
const data = convertUnitsToData(UNITS);

export const ServingCounter = () => {
    const [ unit, setUnit ] = useState<Unit>("serving");
    const [quantity, setQuantity] = useState(1);

    const minusQuantity = () => {
        if(quantity > 1) setQuantity(quantity - 1);
    };
    
    const addQuantity = () => {
        setQuantity(quantity + 1)
    }

    return (
        <View style={styles.container}>
            <View style={styles.quantityWrapper}>
                <TouchableOpacity onPress={()=>setQuantity(quantity - 1)}>
                    <SquareMinusIcon width={32} height={32}/>
                </TouchableOpacity>
                <Input 
                    value={quantity.toString()} 
                    containerStyle={styles.inputContainerStyle} 
                    inputStyle={styles.inputStyle} 
                    onChangeText={(e)=>setQuantity(e)}/>
                <TouchableOpacity onPress={()=>setQuantity(quantity + 1)}>
                    <SquarePlusIcon width={32} height={32} />
                </TouchableOpacity>
            </View>
            <View style={styles.unitWrapper}>
                <Text variant="paragraph2">{unit}</Text>
                <Dropdown 
                    data={ data }  
                    labelField="labelField" 
                    valueField="valueField"
                    value="value"  
                    onChange={(e)=>setUnit(e.valueField)} 
                    containerStyle={styles.selectContainer}
                    itemTextStyle={{fontSize: 24}}
                    iconColor="black"
                    iconStyle={styles.dropDownArrowIcon}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 340,
        height: 64,
        justifyContent: 'space-around',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10
    },
    inputContainerStyle: {
        width: 60,
        height: 40,
    },
    inputStyle: {
        textAlign: 'center',
        fontSize: 32
        // marginBottom: -10
    },
    selectContainer: {
        display: 'flex',
        width: 180,
        height: 240,
        justifyContent: 'center',
        marginLeft:-112,
        marginTop: -40,
        borderRadius: 10
    },
    dropDownArrowIcon: {
        width: 32,
        height: 32,
        borderRadius: 32,
        // borderWidth: 2,
        // borderColor: 'black',
        // backgroundColor: 'red'
    },
    quantityWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    unitWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 140,
        justifyContent: 'space-around'
    }
})