import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "../theme";
import { TextPillButton } from "./TextPillButton";
import { FoodMealType } from "../domains/food/types";
import { useFoodLogsByDateAndMealType } from "../domains/foodLog/hooks";
import { FoodLog } from "../domains/foodLog/types";

type MealsDisplayProps = {
    date: string
}

export const MealsDisplay = ({ date }: MealsDisplayProps) => {
    const [selectedMealType, setSelectedMealType] = useState<FoodMealType | null>(null);
    const { foodLogs } = useFoodLogsByDateAndMealType({ date, mealType: selectedMealType });
    const handleMealSelect = (mealType: FoodMealType) => {
        if(mealType === selectedMealType){
            setSelectedMealType(null)
        } else {
            setSelectedMealType(mealType)
        }
    };
    const renderList = (foodLogs: FoodLog[]) => {
        return (
            <View style={styles.mealsContainer}>
                {foodLogs?.map((log, index)=> {
                    return (
                        <View key={`${log?.food?.name}-${index}`}>
                            <View style={[styles.row, styles.foodItemRow]}>
                                <Text color="white" margin="m" style={styles.foodName}>{log?.food?.name}</Text>
                                <View style={[styles.row, styles.foodItemMacros]}>
                                    <Text variant="paragraph3" color="white">{log.food.calories}</Text>
                                    <Text variant="paragraph3" color="white">{log.food.fat}g</Text>
                                    <Text variant="paragraph3" color="white">{log.food.protein}g</Text>
                                    <Text variant="paragraph3" color="white">{log.food.carbs}g</Text>
                                </View>
                            </View>
                            {(index !== foodLogs.length - 1) && <View style={{height: 1, backgroundColor: '#383838'}}></View>}
                        </View>
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
        padding:16
    },
    mealTypesContainer: {
        padding: 16
    },
    row: {
        flexDirection:'row'
    },
    foodName: {
        maxWidth: 180
    },
    foodItemRow: {
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    foodItemMacros: {
        width: 160,
        justifyContent: 'space-between'
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