import { useEffect } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import {RootStackParamList} from "./types";
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppState  } from '../state';
import { useUserAuth } from "../domains/users/hooks";

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AuthScreen'>;

type AuthScreenProps = {
  navigation: AuthScreenNavigationProp;
};

export const AuthScreen = ({ navigation }: AuthScreenProps ) => {
  const { user: { isLoading, data: userData, handleLoginSuccess} } = useAppState();
  async function signInWithEmail() {
    navigation.navigate('SignInScreen');
  };
  const userAuth = useUserAuth();
  async function signUpWithEmail() {
    navigation.navigate('SignUpScreen')
  };

  useEffect(()=>{
    if(userAuth) {
      handleLoginSuccess({ data: userAuth});
      navigation.replace('HomeScreen');
    }
  }, [userAuth])

  return (
    <ImageBackground source={require('.././../assets/nourish-cover-w-logo.jpeg')} style={styles.container}>
      <View style={styles.authContainer}>
        <View style={styles.verticallySpaced}>
          <Button titleStyle={{color:"black"}} title="Sign up" buttonStyle={styles.signUpButton} disabled={isLoading} onPress={() => signUpWithEmail()} />
        </View>
        <View style={[styles.verticallySpaced]}>
          <Button title="Sign in" buttonStyle={styles.signInButton} disabled={isLoading} onPress={() => signInWithEmail()} />
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  authContainer:{
    marginTop: 'auto',
    marginBottom: '40%',
    padding: 30
  },
  verticallySpaced: {
    paddingTop: 8,
    paddingBottom: 8,
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  mt20: {
    marginTop: 20,
  },
  signInButton: {
    width: 180,
    backgroundColor: 'black',
    borderRadius: 16,
  },
  signUpButton: {
    width: 180,
    backgroundColor: '#C3FF76',
    color: 'black',
    borderRadius: 16,
  },
  logo: {
    alignSelf: 'center',
    marginTop: '85%'
  }
});