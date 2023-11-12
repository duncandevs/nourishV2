import * as FileSystem from 'expo-file-system';
import { Camera, CameraType } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, View, SafeAreaView, Image, Dimensions } from 'react-native';
import RightArrowSvg from '../../assets/right-arrow.svg';
import XIconSvg from '../../assets/x-icon.svg'
import { Text } from '../theme';


import SearchService from '../domains/search/services';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
        <TouchableOpacity style={styles.photoRollButton}>
            <Image source={photoRollPng} />
        </TouchableOpacity>
    )
}

export const CameraScreen = () => {
    const coloredDotsGif = require('../../assets/colored-dots.gif');
    const [type, setType] = useState(CameraType.back);
    const [isLoading, setIsLoading] = useState(false);
    const [isSearchSuccessful, setIsSearchSuccessful] = useState(false);
    const [photo, setPhoto] = useState('');
    const [foodTitle, setFoodTitle] = useState('');
    const [searchError, setSearchError] = useState('');
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const cameraRef = useRef(null);

    if (!permission) {
    // Camera permissions are still loading
    return <Text>Loading...</Text>;
    }

    if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
        <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
        </View>
    );
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            let photo = await cameraRef.current.takePictureAsync();
            setPhoto(photo.uri);
            await getImageSearch(photo.uri)
        }
    };

    const getImageSearch = async (photo: string) => {
        if(photo) {
            setIsLoading(true);
            const base64 = await FileSystem.readAsStringAsync(photo, { encoding: FileSystem.EncodingType.Base64 });
            console.log(base64); // or do something with the base64 string
            const { data, error } = await SearchService.getAISearchPromptByImage({ base64Image: base64});
            if(data) {
                setFoodTitle(data);
                setIsSearchSuccessful(true);
            }
            if(error) {
                setSearchError(error)
            }
            setIsLoading(false);
        };
    };

    const resetImageCapture = () => {
        setPhoto('');
        setIsSearchSuccessful(false);
        setIsLoading(false);
    };

    const isCameraRollShown = !isLoading && !isSearchSuccessful
    console.log('isCameraRollShown - ', isCameraRollShown)
    return (
    <SafeAreaView style={styles.container}>
        {!photo && <View>
            <Camera style={styles.cameraCanvas} type={type} ref={cameraRef} autoFocus>
                <View style={styles.buttonContainer}>
                </View>
            </Camera>
        </View>}
        {photo && <Image source={{uri: photo}} style={styles.cameraCanvas} />}
        <View style={styles.spacer} />
        {!isLoading && <View style={styles.rowCenter}>
            <CameraButton onPress={takePicture}/>
        </View>}
        {isCameraRollShown && <View style={styles.photoRollContainer}>
            <PhotoRollButton />
        </View>}
        {(isLoading || isSearchSuccessful) &&
            <View>
                {isLoading && <Text textAlign='center' style={styles.loadTitle}>Identifying Meal</Text>}
                {!isLoading && isSearchSuccessful && <Text textAlign='center' style={styles.loadTitle}>{foodTitle}</Text>}
                <View style={styles.bottomNav}>
                    <TouchableOpacity style={styles.xIconWrapper} onPress={resetImageCapture}>
                        <XIconSvg width={30} height={30} fill="white"/>
                    </TouchableOpacity>
                    {!isSearchSuccessful && <Image source={coloredDotsGif} style={styles.loading} />}
                    <TouchableOpacity style={styles.rightArrowWrapper}>
                        <RightArrowSvg width={30} height={30} fill="white"/>
                    </TouchableOpacity>
                </View>
            </View>
        }
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding:20,
    backgroundColor: 'white'
  },
  cameraCanvas: {
    height: CAMERA_CANVAS_HEIGHT,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  xIconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightArrowWrapper: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadTitle: {
    margin: 16,
    fontWeight: 500,
  }
});
