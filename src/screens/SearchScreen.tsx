import { View, StyleSheet, TouchableOpacity } from "react-native";
import {RootStackParamList} from "./types";
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Input } from 'react-native-elements';
import { useState } from "react";
import { useAppState } from "../state";
import { Text } from "../theme";
import ForkKnifeSvg from '../../assets/fork-knife.svg';
import FoodService from '../domains/food/services';
import FoodLogService from '../domains/foodLog/services';
import { useRecentFoodLogs } from "../domains/foodLog/hooks";
import { FoodLog } from "../domains/foodLog/types";
import { Food } from "../domains/food/types";
import { ScrollView } from "react-native-gesture-handler";

type SearchScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SearchScreen'>;

type SearchScreenProps = {
  navigation: SearchScreenNavigationProp;
};

export const SearchScreen = ({ navigation }: SearchScreenProps) => {
    const [ searchTerm, setSearchTerm ] = useState('');
    const { search: {isLoading, error, handleSearch, data: searchResults } } = useAppState();
    const recents = useRecentFoodLogs();

    const handleOnSearch = async () => {
        let existingFood: Food | null = null;
        // check if food exists in recent logs;
        const recentFoodLog = recents?.find((item)=>item.food.name === searchTerm);
        if(recentFoodLog) existingFood = recentFoodLog?.food;
        console.log('recentFoodLog - ', recentFoodLog)
        if(!recentFoodLog){
          const {data }= await FoodService.fetchFoodByName({foodName: searchTerm});
          if(data) existingFood = data
        }
        console.log('existingFood - ', existingFood)
        if(!existingFood) handleSearch({ searchTerm });
        navigation.navigate('SearchResultScreen', { food: existingFood });
    };
    
    const handleRecentOnPress = (recent: FoodLog) => {
      setSearchTerm(recent.food.name)
    };

    return <View style={styles.container}>
        <Input
          leftIcon={{ type: 'font-awesome', name: 'search', size:18 }}
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
          placeholder="A bowl of strawberries"
          inputStyle={styles.inputStyle}
        />
        <View style={styles.recents}>
          <Text variant="paragraph2" color="gray03" style={styles.recentTitle}>Recent:</Text>
          <ScrollView>
            {recents?.map((item)=><TouchableOpacity onPress={()=>handleRecentOnPress(item)}>
                <Text variant="paragraph2" style={styles.recentItem}>{item.food.name}</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
        <Button buttonStyle={styles.buttonStyle} title="calculate" onPress={handleOnSearch} icon={<ForkKnifeSvg />} iconPosition="right" />
    </View>
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    padding: 16,
    paddingTop: '50%',
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: 'black', 
    borderRadius: 20, 
    justifyContent: 'space-around', 
    padding: 10,
    width: 260,
    margin: 16
  },
  inputStyle: {
    fontSize: 24
  },
  recents: {
    alignSelf: "flex-start",
    margin: 16,
    maxHeight: 180,
    width: '90%',
  },
  recentTitle:{
    marginBottom: 8
  },
  recentItem: {
    marginBottom: 8
  }
});