import { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Keyboard } from "react-native";
import {RootStackParamList} from "./types";
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Input } from 'react-native-elements';

import { Text } from "../theme";
import ForkKnifeSvg from '../../assets/fork-knife.svg';
import RightArrorSvg from '../../assets/right-arrow.svg';
import SearchService from '../domains/search/services';
import { useRecentFoodLogs } from "../domains/foodLog/hooks";
import { FoodLog } from "../domains/foodLog/types";
import { ScrollView } from "react-native-gesture-handler";
import { ServingCounter } from "../components/ServingCounter";
import { RoundCameraButton } from "../components/RoundCameraButton";

type SearchScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SearchScreen'>;

type SearchScreenProps = {
  navigation: SearchScreenNavigationProp;
};


export const SearchScreen = ({ navigation }: SearchScreenProps) => {
    const rippleGif = require('../../assets/ripple.gif');
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ searchError, setSearchError ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const [isCameraButtonShown, setIsCameraButtonShown] = useState(true);
    const recents = useRecentFoodLogs();
    const [foodQuantity, setFoodQuantity] = useState<number>(1);
    const [foodUnit, setFoodUnit] = useState('');
    const [isFoodInputComplete, setIsFoodInputComplete] = useState(false);

    const handleOnSearch = async () => {
        setIsLoading(true);

        const {data: food, error } = await SearchService.useFoodSearch({ recents, searchTerm, unit:foodUnit, quantity: foodQuantity });
      
        setIsLoading(false);

        if(food) navigation.navigate('SearchResultScreen', { food, quantity: foodQuantity });
        if(error) setSearchError('Something went wrong please try again!');
    };
    
    const handleRecentOnPress = (recent: FoodLog) => {
      setSearchTerm(recent.food.name)
    };

    const handleFoodUnitChange = (unit:string) => setFoodUnit(unit);
    
    const handleFoodQuantityChange = (quantity: number) => setFoodQuantity(quantity);

    const goToCameraScreen = () => navigation.navigate('CameraScreen');

    const _keyboardDidShow = () => {
      setIsCameraButtonShown(false)
    };
    
    const _keyboardDidHide = () => {
      setIsCameraButtonShown(true)
    };
    
    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        _keyboardDidShow,
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        _keyboardDidHide,
      );
    
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []);

    return <View style={styles.container}>
        {isLoading && <Image source={rippleGif} style={styles.loading} />}
        {!isLoading && <>
          <Input
            leftIcon={{ type: 'font-awesome', name: 'search', size:18 }}
            onChangeText={(text) => setSearchTerm(text)}
            value={searchTerm}
            placeholder="A bowl of strawberries"
            inputStyle={styles.inputStyle}
            onPressIn={() => setIsCameraButtonShown(false)}

            // onPressOut={()=>setIsCameraButtonShown(true)}
          />
          {searchError && <Text color="warn">{searchError}</Text>}
          {!isFoodInputComplete &&<>
            <View style={styles.recents}>
              <Text variant="paragraph2" color="gray03" style={styles.recentTitle}>Recent:</Text>
              <ScrollView>
                {recents?.map((item, index)=><TouchableOpacity onPress={()=>handleRecentOnPress(item)} key={`${item.food.name}-${index}`}>
                    <Text variant="paragraph2" style={styles.recentItem}>{item.food.name}</Text>
                  </TouchableOpacity>
                )}
              </ScrollView>
            </View>
          </>}
          {isFoodInputComplete && <View style={styles.centerRow}>
            <ServingCounter containerStyle={styles.counterStyle} onUnitChange={handleFoodUnitChange} onQuantityChange={handleFoodQuantityChange}/>
          </View> }
          {!isFoodInputComplete && <Button disabled={!searchTerm} buttonStyle={styles.buttonStyle} title="servings" onPress={()=>setIsFoodInputComplete(true)} icon={<RightArrorSvg width={24} height={24} fill='white'/>} iconPosition="right" />}
          {isFoodInputComplete && <Button buttonStyle={styles.buttonStyle} title="calculate" onPress={handleOnSearch} icon={<ForkKnifeSvg />} iconPosition="right" />}

        </>}
    </View>
};

{/* <View style={styles.recents}>
<Text variant="paragraph2" color="gray03" style={styles.recentTitle}>Recent:</Text>
<ScrollView>
  {recents?.map((item, index)=><TouchableOpacity onPress={()=>handleRecentOnPress(item)} key={`${item.food.name}-${index}`}>
      <Text variant="paragraph2" style={styles.recentItem}>{item.food.name}</Text>
    </TouchableOpacity>
  )}
</ScrollView>
</View>
<Button buttonStyle={styles.buttonStyle} title="calculate" onPress={handleOnSearch} icon={<ForkKnifeSvg />} iconPosition="right" />
{isCameraButtonShown && <RoundCameraButton title="Try food vision" onPress={goToCameraScreen}/>} */}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    padding: 16,
    paddingTop: '30%',
    alignItems: 'center',
    gap: 16
  },
  buttonStyle: {
    backgroundColor: 'black', 
    borderRadius: 20, 
    justifyContent: 'space-around', 
    padding: 10,
    width: 260,
    margin: 16,
    marginTop: 24
  },
  inputStyle: {
    fontSize: 24
  },
  centerRow: {
    height: 180,
  },
  recents: {
    alignSelf: "flex-start",
    margin: 16,
    maxHeight: 200,
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
  counterStyle: {
    marginTop: 24
  }
});