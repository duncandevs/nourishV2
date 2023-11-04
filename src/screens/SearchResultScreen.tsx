import { useEffect, useState } from "react";
import { View , Image, StyleSheet, ImageBackground} from "react-native";
import { Text } from "../theme";
import {RootStackParamList} from "./types";
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppState } from "../state";
import { Button, Chip } from 'react-native-elements';
import { getDateNow } from "../utility/dates";
import CircleCheck from "../../assets/circle-check.svg";
import { TextPillButton } from "../components";
import { FoodMealType } from "../domains/food/types";
import { Food } from "../domains/food/types";
import FoodLogService from "../domains/foodLog/services";

type SearchResultScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SearchResultScreen'>;

type SearchScreenProps = {
  navigation: SearchResultScreenNavigationProp;
  route: {
    params: {
        food: Food | null
    }
  }
};

const mealTypes: FoodMealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

export const SearchResultScreen = ({ navigation, route }: SearchScreenProps ) => {
    const [mealType, setMealType] = useState(null)
    const {
        user: {data: user},
        foodLogs: { setNewFoodLog }
    } = useAppState();
    const gradient = require('../../assets/round-gradient-blue-green.png');
    const [mealTypeError, showMealTypeError] = useState(false);
    const [foodLogError, setFoodLogError ] = useState('');
    const {params: { food }} = route; // check if there's an existing food item
    const [ foodData, setFoodData ] = useState<Food>({
        id: '',
        name: '',
        calories: 0,
        fat: 0,
        protein: 0,
        carbs: 0
    });

    const handleSaveFoodLog = async () => {
        if(!mealType) {
            showMealTypeError(true) 
            return;
        };

        const newFoodLog = {
            foodData,
            mealType,
            date: getDateNow(),
            quantity: 1
        };
        const { data, error } = await FoodLogService.createFoodLogFromSearch({ ...newFoodLog });
        if(data) setNewFoodLog({ foodLog: data })
        if(!error) navigation.navigate('HomeScreen');
        if(error) setFoodLogError(error);
    };

    const handleSelectMealType = (mealType: string) => {
        setMealType(mealType)
        showMealTypeError(false)
    };

    useEffect(()=>{
        // if an existing food item is available set foodData to this
        if(food) setFoodData({...food});
    }, [food])

    return <View style={styles.container}>
        <ImageBackground source={gradient} style={styles.outerCircle}>
            <View style={styles.innerCircle}>
                <Text variant="header1">{foodData.calories}</Text>
            </View>
        </ImageBackground> 
        <View>
            <Text marginTop="m" variant="paragraph2" style={styles.resultText}>Estimated calorie count for</Text>
            <Text variant="paragraph2" style={styles.resultText}>{foodData.name}</Text>
            <View style={[styles.row, styles.macros]}>
                <View style={styles.macroWrapper}>
                    <Text variant="paragraph1">Fat</Text>
                    <Text variant="header2">{foodData.fat}G</Text>
                </View>
                <View style={styles.macroWrapper}>
                    <Text variant="paragraph1">Protein</Text>
                    <Text variant="header2">{foodData.protein}G</Text>
                </View>
                <View style={styles.macroWrapper}>
                    <Text variant="paragraph1">Carbs</Text>
                    <Text variant="header2">{foodData.carbs}G</Text>
                </View>
            </View>
        </View>
        <View style={styles.mealTypes}>
            <View style={[styles.row]}>
                {mealTypes.map((i)=>{
                    return <TextPillButton key={i} title={i} handleOnPress={()=>handleSelectMealType(i)} active={i === mealType}/>
                })}
            </View>
            {mealTypeError && <Text color="warn">please select a meal</Text>}
        </View>
        <Button 
            buttonStyle={styles.addToLogButton} 
            title="add to log" onPress={handleSaveFoodLog}
            icon={<CircleCheck />}
            iconPosition="right"
        /> 
    </View>
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '100%',
        paddingTop: '28%',
        backgroundColor: 'white',
        padding: 16
    },
    loading: { 
        width: 200, 
        height: 200,
        alignSelf: 'center' 
    },
    row: {
        flexDirection: 'row'
    },
    addToLogButton: {
        width: 180,
        borderRadius: 20,
        justifyContent: 'space-around',
        backgroundColor: 'black'
    },
    outerCircle: {
        width: 124,
        height: 124,
        borderRadius: 124,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    innerCircle: {
        backgroundColor: 'white',
        width: 108,
        height: 108,
        borderRadius: 108,
        justifyContent: 'center',
        alignItems: 'center'
    },
    macros:{
        justifyContent: 'center',
        margin: 16
    },
    macroWrapper: {
        margin: 8,
        alignItems: 'center'
    },
    mealTypes: {
        marginBottom: 32 ,
        alignItems: 'center'
    },
    resultText: {
        textAlign: 'center'
    }
})