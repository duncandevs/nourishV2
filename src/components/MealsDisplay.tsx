import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "../theme";
import { TextPillButton } from "./TextPillButton";
import { FoodMealType } from "../domains/food/types";
import { useFoodLogsByDateAndMealType } from "../domains/foodLog/hooks";
import { todaysDateRegular } from "../utility";
import { FlatList } from "react-native-gesture-handler";
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
                {foodLogs?.map((log)=> {
                    return (
                        <View>
                            <Text color="white" margin="m">{log?.food?.name}</Text>
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
                <View style={[{flexDirection: 'row'}]}>
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
    }
})