import * as FileSystem from 'expo-file-system';
import { Camera, CameraType } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, View, SafeAreaView, Image, Dimensions } from 'react-native';
import RightArrowSvg from '../../assets/right-arrow.svg';
import XIconSvg from '../../assets/x-icon.svg';
import PhotoRollSvg from '../../assets/photo-roll-icon.svg';
import { Text } from '../theme';
import * as ImagePicker from 'expo-image-picker';

import SearchService from '../domains/search/services';
import { useRecentFoodLogs } from "../domains/foodLog/hooks";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ServingCounter } from "../components/ServingCounter";

const SCREEN_HEIGHT = Dimensions.get('window').height;
const CAMERA_CANVAS_HEIGHT = SCREEN_HEIGHT * 0.6;

const CameraButton = ({ onPress }) => {
    return (<TouchableOpacity style={styles.outerCameraRing} onPress={onPress}>
        <View style={styles.innerCameraRing}></View>
    </TouchableOpacity>)
};

const PhotoRollButton = ({ onPress }) => {
    const photoRollPng = require('../../assets/photo-roll-icon.png')
    return (
        <TouchableOpacity style={styles.photoRollButton} onPress={onPress}>
            <PhotoRollSvg />
        </TouchableOpacity>
    )
}

export const FoodVisionScreen = ({ navigation }) => {
    const coloredDotsGif = require('../../assets/colored-dots.gif');
    const rippleGif = require('../../assets/ripple.gif');
    const [type, setType] = useState(CameraType.back);
    const [isLoading, setIsLoading] = useState(false);
    const [isFoodSearchLoading, setIsFoodSearchLoading] = useState(false);
    const [isSearchSuccessful, setIsSearchSuccessful] = useState(false);
    const [photo, setPhoto] = useState('');
    const [foodTitle, setFoodTitle] = useState('');
    const [searchError, setSearchError] = useState('');
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const cameraRef = useRef(null);
    const recents = useRecentFoodLogs();
    const [foodQuantity, setFoodQuantity] = useState<number>(1);

    if (!permission) {
        // Camera permissions are still loading
        return <Text>Loading...</Text>;
    };

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>Click below to enable food vision</Text>
            <Button onPress={requestPermission} title="grant camera permission" />
            </View>
        );
    };

    const takePicture = async () => {
        if (cameraRef.current) {
            let photo = await cameraRef.current.takePictureAsync();
            setPhoto(photo.uri);
            await getImageSearch(photo.uri);
        };
    };

    const getImageSearch = async (photo: string) => {
        if(photo) {
            setIsLoading(true);
            const base64 = await FileSystem.readAsStringAsync(photo, { encoding: FileSystem.EncodingType.Base64 });
            const { data, error } = await SearchService.getAISearchPromptByImage({ base64Image: base64});
            if(data) {
                setFoodTitle(data);
                setIsSearchSuccessful(true);
            }
            if(error) {
                setSearchError(error);
            }
            setIsLoading(false);
        };
    };

    const resetImageCapture = () => {
        setPhoto('');
        setIsSearchSuccessful(false);
        setIsLoading(false);
    };

    const isCameraRollShown = !isLoading && !isSearchSuccessful;
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [3, 4],
          quality: 1,
        });

        if(result){
            const photoUrl = result?.assets?.[0]?.uri
            if(photoUrl) {
                setPhoto(photoUrl);
                getImageSearch(photoUrl);
            };
        };
    };
    
    const handlePhotoRoll = async () => {
       const {status} =  await ImagePicker.requestMediaLibraryPermissionsAsync();
       if(status === 'granted') {
            await pickImage();
       };
    };

    const handleSearch = async () => {
        setIsFoodSearchLoading(true);
        const {data: food, error } = await SearchService.useFoodSearch({ recents, searchTerm: foodTitle });
        if(food) {
            navigation.navigate('SearchResultScreen', { food, quantity: foodQuantity });
            setIsFoodSearchLoading(false);
        };
        if(error) {
            setSearchError('Something went wrong please try again!');
            setIsFoodSearchLoading(false);
        };
    };

    const handleFoodQuantityChange = (quantity: number) => setFoodQuantity(quantity);

    if(isFoodSearchLoading) {
        return <View style={styles.rippleWrapper}>
                <Image source={rippleGif} style={styles.ripple} />
            </View>
    };

    return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
          {!photo && <View>
              <Camera style={styles.cameraCanvas} type={type} ref={cameraRef} autoFocus>
                  <View style={styles.buttonContainer}>
                  </View>
              </Camera>
          </View>}
          {photo && <Image source={{uri: photo}} style={styles.imageCanvas} />}
          {!isLoading && !isSearchSuccessful && <View style={styles.rowCenter}>
              <CameraButton onPress={takePicture}/>
          </View>}
          {isCameraRollShown && <View style={styles.photoRollContainer}>
              <PhotoRollButton onPress={handlePhotoRoll}/>
          </View>}
          {(isLoading || isSearchSuccessful) && <>
              <View style={styles.titleAndServings}>
                  {isLoading && <Text textAlign='center' style={styles.loadTitle}>Identifying Meal</Text>}
                  {!isLoading && isSearchSuccessful && <Text textAlign='center' variant='paragraph1' style={styles.loadTitle}>{foodTitle}</Text>}
                  {!isLoading && isSearchSuccessful && <ServingCounter containerStyle={styles.servingsCounter} onQuantityChange={handleFoodQuantityChange} />}
              </View>
              <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.xIconWrapper} onPress={resetImageCapture}>
                    <XIconSvg width={30} height={30} fill="white"/>
                </TouchableOpacity>
                {!isSearchSuccessful && <Image source={coloredDotsGif} style={styles.loading} />}
                <TouchableOpacity style={styles.rightArrowWrapper} onPress={handleSearch}>
                    <RightArrowSvg width={30} height={30} fill="white"/>
                </TouchableOpacity>
              </View>
          </>}
        </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: '100%',
    padding:20,
    backgroundColor: 'white',
  },
  cameraCanvas: {
    height: CAMERA_CANVAS_HEIGHT,
    borderRadius: 20,
    marginBottom: 20,
  },
  imageCanvas: {
    height: SCREEN_HEIGHT * 0.5,
    borderRadius: 20
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  rowCenter: {
    alignSelf: 'center'
  },
  outerCameraRing: {
    backgroundColor: 'black',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60
  },
  innerCameraRing : {
    width: 18,
    height: 18,
    backgroundColor: 'red',
    borderRadius: 18
  },
  loading: {
    width:60,
    height: 60,
    alignSelf: 'center'
  },
  photoRollContainer: {
    position: 'absolute',
    margin: 20,
    bottom: 20
  },
  photoRollButton: {
    width: 54,
    height: 72,
    borderRadius: 8,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  spacer: {
    margin: 20
  },
  bottomNav: {
    marginTop: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  xIconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightArrowWrapper: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadTitle: {
    margin: 20,
    fontWeight: '500',
  },
  ripple: {
    width:200, 
    height:200, 
    alignSelf: 'center'
  },
  rippleWrapper: {
    flex: 1, 
    height: '100%', 
    backgroundColor: 'white', 
    justifyContent: 'center'
  },
  servingsCounter: {
    alignSelf: 'center',
    marginBottom: 24
  },
  titleAndServings: {
    height: 160
  }
});
