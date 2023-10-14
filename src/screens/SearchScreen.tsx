import { View, Text } from "react-native";
import {RootStackParamList} from "./types";
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Input } from 'react-native-elements';
import { useState } from "react";
import { useAppState } from "../state";

type SearchScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SearchScreen'>;

type SearchScreenProps = {
  navigation: SearchScreenNavigationProp;
};

export const SearchScreen = ({ navigation }: SearchScreenProps) => {
    const [ searchTerm, setSearchTerm ] = useState('');
    const { search: {isLoading, error, handleSearch, data: searchResults } } = useAppState();

    const handleOnSearch = () => {
        handleSearch({ searchTerm });
        navigation.navigate('SearchResultScreen');
    };


    return <View>
        <Text>Search Screen</Text>
        <Input
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
          placeholder="A bowl of strawberries"
        />
        <Button title="calculate" onPress={handleOnSearch}/>
    </View>
}