import { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Button, Input } from 'react-native-elements';
import {RootStackParamList} from "./types";
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppState  } from '../state';

type SignUpLoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUpLoginScreen'>;

type SignUpLoginScreenProps = {
  navigation: SignUpLoginScreenNavigationProp;
};

export const SignUpLoginScreen = ({ navigation }: SignUpLoginScreenProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user: { error: loginError, isLoading, handleLogin, data: userData} } = useAppState();

    async function signInWithEmail() {
      await handleLogin({ email, password })
      navigation.navigate('HomeScreen')
    };
  
    async function signUpWithEmail() {
      // const { error, data } = await supabaseClient.signUp({
      //   email: email,
      //   password: password,
      // })
  
      // if (error) Alert.alert(error)
      navigation.navigate('SignUpLoginScreen')
    };

    return (
      <ImageBackground style={styles.container} source={require('../../assets/nourish-background-cover-top-logo.jpeg')}>
          <View style={styles.inputGroup}>
              <Input
                  label="Email"
                  leftIcon={{ type: 'font-awesome', name: 'envelope', size:18 }}
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  placeholder="email@address.com"
                  autoCapitalize={'none'}
                  inputContainerStyle={styles.input}
                  labelStyle={styles.label}
              />
              <Input
                  label="Password"
                  leftIcon={{ type: 'font-awesome', name: 'lock' }}
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  secureTextEntry={true}
                  placeholder="Password"
                  autoCapitalize={'none'}
                  inputContainerStyle={styles.input}
                  labelStyle={styles.label}
              />
              <Button title="Sign in" buttonStyle={styles.signInButton} disabled={isLoading} onPress={() => signInWithEmail()} />
          </View>
      </ImageBackground>
    )
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center'
    },
    inputGroup: {
      marginTop: '50%',
      width: 300,
    }, 
    logo: {
      alignSelf: 'center',
      marginTop: '85%'
    },
    input: {
      backgroundColor: 'white',
      borderRadius: 16,
      padding: 4,
      paddingLeft: 8,
      opacity: 0.8
    },
    label: {
      color: 'white'
    },
    signInButton: {
      margin: 8,
      backgroundColor: 'black',
      borderRadius: 16,
    },
    signUpButton: {
      width: 180,
      backgroundColor: '#C3FF76',
      color: 'black',
      borderRadius: 16,
    },
})
