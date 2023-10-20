import { View, StyleSheet, TouchableOpacity } from "react-native";
import {RootStackParamList} from "./types";
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Input } from 'react-native-elements';
import { useState } from "react";
import { useAppState } from "../state";
import { Text } from "../theme";
import ForkKnifeSvg from '../../assets/fork-knife.svg';
import FoodService from '../domains/food/services';

type SearchScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SearchScreen'>;

type SearchScreenProps = {
  navigation: SearchScreenNavigationProp;
};

export const SearchScreen = ({ navigation }: SearchScreenProps) => {
    const [ searchTerm, setSearchTerm ] = useState('');
    const { search: {isLoading, error, handleSearch, data: searchResults } } = useAppState();

    const handleOnSearch = async () => {
        const { data: food, error: foodError } = await FoodService.fetchFoodByName({foodName: searchTerm });
        // only search if this term doesn't match an existing Food
        if(!food) handleSearch({ searchTerm });
        navigation.navigate('SearchResultScreen', { food });
    };

    const recents = ["Egg & toast", "Cappuccino", "Salad with salmon", "Steak and potatoes"]
    const handleRecentOnPress = (recent: string) => {
      setSearchTerm(recent)
    }

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
          {recents.map((item)=><TouchableOpacity onPress={()=>handleRecentOnPress(item)}>
              <Text variant="paragraph2" style={styles.recentItem}>{item}</Text>
            </TouchableOpacity>
          )}
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
    margin: 16
  },
  recentTitle:{
    marginBottom: 8
  },
  recentItem: {
    marginBottom: 8
  }
});