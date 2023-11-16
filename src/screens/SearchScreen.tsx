import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import {RootStackParamList} from "./types";
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Input } from 'react-native-elements';
import { useState } from "react";
import { Text } from "../theme";
import ForkKnifeSvg from '../../assets/fork-knife.svg';
import SearchService from '../domains/search/services';
import { useRecentFoodLogs } from "../domains/foodLog/hooks";
import { FoodLog } from "../domains/foodLog/types";
import { ScrollView } from "react-native-gesture-handler";
import { ServingCounter } from "../components/ServingCounter";

type SearchScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SearchScreen'>;

type SearchScreenProps = {
  navigation: SearchScreenNavigationProp;
};


export const SearchScreen = ({ navigation }: SearchScreenProps) => {
    const ripple = require('../../assets/ripple.gif');
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ searchError, setSearchError ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const recents = useRecentFoodLogs();

    const handleOnSearch = async () => {
        setIsLoading(true);

        const {data: food, error } = await SearchService.useFoodSearch({ recents, searchTerm });
      
        setIsLoading(false);

        if(food) navigation.navigate('SearchResultScreen', { food });
        if(error) setSearchError('Something went wrong please try again!');
    };
    
    const handleRecentOnPress = (recent: FoodLog) => {
      setSearchTerm(recent.food.name)
    };

    return <View style={styles.container}>
        {isLoading && <Image source={ripple} style={styles.loading} />}
        {!isLoading && <>
          <Input
            leftIcon={{ type: 'font-awesome', name: 'search', size:18 }}
            onChangeText={(text) => setSearchTerm(text)}
            value={searchTerm}
            placeholder="A bowl of strawberries"
            inputStyle={styles.inputStyle}
          />
          {searchError && <Text color="warn">{searchError}</Text>}
          <View style={styles.recents}>
            <Text variant="paragraph2" color="gray03" style={styles.recentTitle}>Recent:</Text>
            <ScrollView>
              {recents?.map((item, index)=><TouchableOpacity onPress={()=>handleRecentOnPress(item)} key={`${item.food.name}-${index}`}>
                  <Text variant="paragraph2" style={styles.recentItem}>{item.food.name}</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
          <ServingCounter />
          <Button buttonStyle={styles.buttonStyle} title="calculate" onPress={handleOnSearch} icon={<ForkKnifeSvg />} iconPosition="right" />
        </>}
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
  },
  loading: { 
    width: 200, 
    height: 200,
    alignSelf: 'center'
},
});