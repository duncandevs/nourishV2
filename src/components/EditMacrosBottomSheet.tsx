import React, { useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, StyleSheet, Dimensions, View } from 'react-native';
import { Slider, Button } from 'react-native-elements';
import { Colors, Text } from '../theme';
import UserService from '../domains/users/services';
import { useAppState } from '../state';

type EditMacrosBottomSheetProps = {
  isVisible: boolean;
  onClose: () => void;
  startingValue: number;
}

const SCREEN_HEIGHT = Dimensions.get('window').height;

function mapToRange(value: number) {
  if (value >= 0 && value <= 1) {
      return Math.round(value * 5000 / 10) * 10;
  } else {
      throw new Error("Input must be between 0 and 1");
  }
};


export const EditMacrosBottomSheet = ({ isVisible=false, onClose }: EditMacrosBottomSheetProps) => {
  const { 
    user: { data: user, updateUserState }, 
  } = useAppState();
  const userId = user?.id;
  const [target, setTarget ] = useState(0.4);
  const [ displayTarget, setDisplayTarget ] = useState(target);
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dy: translateY }], { useNativeDriver: false }),
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dy > 150) {
        closeSheet();
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const closeSheet = () => {
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT,
      duration: 300,
      useNativeDriver: false,
    }).start(onClose);
  };

  const handleSetTarget = async (target: number) => {
    const updateTarget = mapToRange(target);
    const { error } = await UserService.updateUserCalorieTarget({ userId, target: updateTarget });
    if(!error) await updateUserState({...user, ...{calorie_target: updateTarget}});
    closeSheet();
  };

  if (isVisible) {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  useEffect(()=>{
    setDisplayTarget(mapToRange(target))
  }, [target])

  return (
    <Animated.ScrollView
      style={{ ...styles.bottomSheet, transform: [{ translateY }] }}
      {...panResponder.panHandlers}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text variant='header3'>SET DAILY TARGET</Text>
          <Text variant="link1" onPress={closeSheet}>close</Text>
        </View>
        {/* <Button title="Close" onPress={closeSheet} /> */}
        <Text variant='display2'>CALORIES - {displayTarget}</Text>
        <Slider 
          value={target}
          minimumValue={0}
          thumbStyle={styles.thumbStyle} 
          trackStyle={styles.trackStyle}
          onValueChange={(value)=> setTarget(value)}/>
        <Button title="Set Target" buttonStyle={styles.submitButton} onPress={()=>handleSetTarget(target)}/>
      </View>
    </Animated.ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingLeft: 8,
    paddingRight: 8,
    gap: 32,
  },
  bottomSheet: {
    position: 'absolute',
    height: '50%', // adjust as per need
    width: '100%',
    backgroundColor: 'white',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    zIndex: 10,
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  thumbStyle: {
    backgroundColor: Colors.highlight, 
    width: 24,
  },
  trackStyle: {
    height: 24,
    backgroundColor: Colors.highlight,
  },
  submitButton: {
    borderRadius: 10,
    height: 48,
    backgroundColor: "black"
  },
});
