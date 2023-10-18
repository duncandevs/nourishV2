import React, { useEffect, useState } from 'react'
import { Alert, ImageBackground, StyleSheet, View } from 'react-native'
import { Button, Input } from 'react-native-elements';
import {RootStackParamList} from "./types";
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppState  } from '../state';

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AuthScreen'>;

type AuthScreenProps = {
  navigation: AuthScreenNavigationProp;
};

export const AuthScreen = ({ navigation }: AuthScreenProps ) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { user: { error: loginError, isLoading, handleLogin, data: userData} } = useAppState();
  const [isFormsShown, setShowForms] = useState(false);

  async function signInWithEmail() {
    // await handleLogin({ email, password })
    navigation.navigate('SignUpLoginScreen')
  };

  async function signUpWithEmail() {
    // const { error, data } = await supabaseClient.signUp({
    //   email: email,
    //   password: password,
    // })

    // if (error) Alert.alert(error)
    navigation.navigate('SignUpLoginScreen')
  };

  useEffect(()=>{
    if(userData) navigation.replace('HomeScreen')
    if(loginError) Alert.alert(loginError)
  }, [userData, loginError])

  const renderForms = () => {
    return <View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Input
            label="Email"
            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={'none'}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Password"
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={'none'}
          />
        </View>
    </View>
  }

  return (
    <ImageBackground source={require('.././../assets/nourish-cover-w-logo.jpeg')} style={styles.container}>
      {isFormsShown && renderForms()}
      {/* {!isFormsShown && <Image source={require('../../assets/nourish-cover-logo.png')}  style={styles.logo}/>} */}
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