import { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "../theme";
import { TextPillButton } from "./TextPillButton";
import { FoodMealType } from "../domains/food/types";
import { useFoodLogsByDateAndMealType } from "../domains/foodLog/hooks";
import { FoodLog } from "../domains/foodLog/types";
import { Button } from "react-native-elements";
import { useAppState } from "../state";
import { getRoundedMacros } from "../utility";

type MealsDisplayProps = {
    date: string
}

export const MealsDisplay = ({ date }: MealsDisplayProps) => {
    const [selectedMealType, setSelectedMealType] = useState<FoodMealType | null>(null);
    // const [foodLogs, setFoodLogs] = useState([]);
    const { foodLogs } = useFoodLogsByDateAndMealType({ date, mealType: selectedMealType });
    const { foodLogs: { deleteFoodLog } } = useAppState();
    const handleMealSelect = (mealType: FoodMealType) => {
        if(mealType === selectedMealType){
            setSelectedMealType(null)
        } else {
            setSelectedMealType(mealType)
        }
    };
    const [itemClicked, setItemClicked ] = useState<number | null>(null);
    const handleItemClicked = (index: number) => {
        const newIndex = index === itemClicked ? null : index;
        setItemClicked(newIndex);
    };
    const handleDeleteItem = async (index: number) => {
       await deleteFoodLog({foodLogId: foodLogs[index].id });
       setItemClicked(null);
    }
    
    const renderList = (foodLogs: FoodLog[]) => {
        return (
            <View style={styles.mealsContainer}>
                {foodLogs?.map((log, index)=> {
                    const isItemClicked = itemClicked === index;
                    const macros = getRoundedMacros({
                        calories: log.food.calories,
                        fat: log.food.fat,
                        protein: log.food.protein,
                        carbs: log.food.carbs,
                    });
                    return (
                        <TouchableOpacity key={`${log?.food?.name}-${index}`} onPress={()=>handleItemClicked(index)}>
                            <View style={[styles.row, styles.foodItemRow]}>
                                {isItemClicked && <View style={{margin: 8}}>
                                    <Button title="delete" buttonStyle={{backgroundColor: 'red'}} onPress={()=>handleDeleteItem(index)}/>
                                </View>}
                                <Text color="white" margin="m" style={styles.foodName}>{log?.food?.name}</Text>
                                <View style={[styles.row, styles.foodItemMacros]}>
                                    <Text variant="paragraph3" color="white">{macros.calories}</Text>
                                    <Text variant="paragraph3" color="white">{macros.fat}g</Text>
                                    <Text variant="paragraph3" color="white">{macros.protein}g</Text>
                                    <Text variant="paragraph3" color="white">{macros.carbs}g</Text>
                                </View>
                            </View>
                            {(index !== foodLogs.length - 1) && <View style={{height: 1, backgroundColor: '#383838'}}></View>}
                        </TouchableOpacity>
                    )}
                )}
            </View>
        )
    };

    return (
        <View>
            <View style={styles.mealTypesContainer}>
                <Text variant='header2' padding='s'>MEALS</Text>
                <View style={[styles.row]}>
                    <TextPillButton 
                        title="breakfast" 
                        handleOnPress={()=>handleMealSelect('breakfast')}
                        active={selectedMealType === 'breakfast'}
                    />
                    <TextPillButton 
                        title="lunch" 
                        handleOnPress={()=>handleMealSelect('lunch')}
                        active={selectedMealType === 'lunch'}
                    />
                    <TextPillButton 
                        title="dinner" 
                        handleOnPress={()=>handleMealSelect('dinner')}
                        active={selectedMealType === 'dinner'}
                    />
                    <TextPillButton 
                        title="snacks" 
                        handleOnPress={()=>handleMealSelect('snack')}
                        active={selectedMealType === 'snack'}
                    />
                </View>
            </View>
            <View style={styles.foodItemWrapper}>
                <View style={styles.foodItemHeader}>
                    <Text variant="paragraph3" color="white">calories</Text>
                    <Text variant="paragraph3" color="white">fat</Text>
                    <Text variant="paragraph3" color="white">protein</Text>
                    <Text variant="paragraph3" color="white">carbs</Text>
                </View>
            </View>
            <View style={{height: 1, backgroundColor: '#383838'}}></View>
            {renderList(foodLogs)}
        </View>
    );
};

const styles = StyleSheet.create({
    mealsContainer: {
        backgroundColor: '#1F1F1F',
        minHeight: 300,
    },
    mealTypesContainer: {
        padding: 16,
    },
    row: {
        flexDirection:'row'
    },
    foodName: {
        maxWidth: 160
    },
    foodItemRow: {
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    foodItemMacros: {
        width: 200,
        justifyContent: 'space-around'
    },
    foodItemWrapper: {
        width: '100%',
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: '#1F1F1F',
    },
    foodItemHeader: {
        width: 200,
        flexDirection:'row',
        marginLeft: 'auto',
        justifyContent: 'space-around'
    }
})