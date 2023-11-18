import { useEffect, useState } from "react";
import { View , Image, StyleSheet, StyleProp} from "react-native";
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
import { Macros } from "../domains/foodLog/types";

type SearchResultScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SearchResultScreen'>;

type SearchScreenProps = {
  navigation: SearchResultScreenNavigationProp;
  route: {
    params: {
        food: Food | null,
        quantity: number
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
    const [mealTypeError, showMealTypeError] = useState(false);
    const [foodLogError, setFoodLogError ] = useState('');
    const {params: { food, quantity }} = route; // check if there's an existing food item
    const [ foodData, setFoodData ] = useState<Food>({
        id: '',
        name: '',
        calories: 0,
        fat: 0,
        protein: 0,
        carbs: 0
    });

    const displayMacros: Macros = {
        calories: foodData?.calories * quantity || 0,
        fat: foodData?.fat * quantity || 0,
        protein: foodData?.protein * quantity || 0,
        carbs: foodData?.carbs * quantity || 0,
    };

    const handleSaveFoodLog = async () => {
        if(!mealType) {
            showMealTypeError(true) 
            return;
        };

        const newFoodLog = {
            foodData,
            mealType,
            date: getDateNow(),
            quantity: quantity || 1,
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
        <View style={styles.macrosContainer}>
            <View style={styles.titleWrapper}>
                <Text variant="paragraph1" style={styles.resultText} fontWeight="500">{foodData.name}</Text>
                <View style={{height:1, backgroundColor: '#D9D9D9', margin: 0}}></View>
            </View>
            <View style={styles.caloriesSection}>
                <View style={styles.largeRoundedWrapper}>
                    <Text variant="header1" color="white">{displayMacros.calories}</Text>
                    <Text color="white">Calories</Text>
                </View>
            </View>
            <View style={[styles.row, styles.macros]}>
                <View style={styles.smallRoundedWrapper}>
                    <View style={[styles.macroWrapper, styles.fat]}>
                        <Text variant="header2">{displayMacros.fat}</Text>
                        <Text variant="paragraph2" fontWeight="500">G</Text>
                    </View>
                    <Text variant="paragraph2">Fat</Text>
                </View>
                <View style={styles.smallRoundedWrapper}>
                    <View style={[styles.macroWrapper, styles.protein]}>
                        <Text variant="header2">{displayMacros.protein}</Text>
                        <Text variant="paragraph2" fontWeight="500">G</Text>
                    </View>
                    <Text variant="paragraph2">Protein</Text>
                </View>
                <View style={styles.smallRoundedWrapper}>
                    <View style={[styles.macroWrapper, styles.carbs]}>
                        <Text variant="header2">{displayMacros.carbs}</Text>
                        <Text variant="paragraph2" fontWeight="500">G</Text>
                    </View>
                    <Text variant="paragraph2">Carbs</Text>
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
        backgroundColor: 'white',
        paddingTop: 48,
        padding: 16,
        gap: 32
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
        width: 269,
        height: 48,
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'space-between',
        backgroundColor: 'black'
    },
    macrosContainer: {
        gap: 32
    },
    macros:{
        justifyContent: 'center',
        gap:20
    },
    macroWrapper: {
        width: 72,
        height: 88,
        backgroundColor: 'gray',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    mealTypes: {
        marginBottom: 32 ,
        alignItems: 'center'
    },
    resultText: {
        textAlign: 'center',
    },
    titleWrapper:{
        maxWidth: 300,
        gap: 10
    },
    caloriesSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    largeRoundedWrapper: {
        width: 114,
        height: 122,
        backgroundColor: 'black',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    smallRoundedWrapper: {
        alignItems: 'center'
    },
    fat: {
        backgroundColor: '#FFC876'
    },
    protein: {
        backgroundColor: '#A1CDFF'
    },
    carbs: {
        backgroundColor: '#FF7676'
    }
})