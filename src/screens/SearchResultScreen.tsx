import React, { useState } from "react";
import { View, Text , Image, StyleSheet} from "react-native";

import {RootStackParamList} from "./types";
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppState } from "../state";
import { Button, Chip } from 'react-native-elements';
import FoodService from "../domains/food/services";
import FoodLogService from "../domains/foodLog/services";
import { getDateNow } from "../utility/dates";

type SearchResultScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SearchResultScreen'>;

type SearchScreenProps = {
  navigation: SearchResultScreenNavigationProp;
};

export const SearchResultScreen = ({ navigation }: SearchScreenProps ) => {
    const [mealType, setMealType] = useState('breakfast')
    const {
        search: { data: searchResults, isLoading },
        foodLogs: { createFoodLog, createFoodLogError }
    } = useAppState();

    const handleSaveFoodLog = async () => {
        const newFoodLog = {
            foodData: searchResults,
            mealType,
            date: getDateNow(),
            quantity: 1
        }
        const { success } = await createFoodLog(newFoodLog);
        if(success) navigation.navigate('HomeScreen');
    };

    const handleSelectMealType = (mealType: string) => {
        setMealType(mealType)
    }

    return <View style={styles.container}>
        {isLoading && <Image source={require('../../assets/ripple.gif')} style={styles.loading} />}
        { !isLoading && searchResults && 
            <>
                <View>
                    <Text>{searchResults.name}</Text>
                    <Text>{searchResults.calories} calories</Text>
                    <Text>{searchResults.fat}g fat</Text>
                    <Text>{searchResults.carbs}g carbs</Text>
                    <Text>{searchResults.protein}g protein</Text>
                    <Text>{mealType}</Text>
                </View>
                <Button title="add to log" onPress={handleSaveFoodLog}/> 
                <View>
                    {['breakfast', 'lunch', 'dinner', 'snack'].map((i)=><Chip title={i} containerStyle={{margin: 10}} onPress={()=>handleSelectMealType(i)}/>)}
                </View>
            </>
        }
    </View>
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'white'
    },
    loading: { 
        width: 200, 
        height: 200,
        alignSelf: 'center' 
    }
})