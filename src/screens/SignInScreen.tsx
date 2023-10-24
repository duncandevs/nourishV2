import { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Button, Input } from 'react-native-elements';
import { Text } from "../theme";
import {RootStackParamList} from "./types";
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppState  } from '../state';
import { validateEmail, validatePassword } from "../utility";
import UserService from "../domains/users/services";

type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignInScreen'>;

type SignInScreenProps = {
  navigation: SignInScreenNavigationProp;
};

export const SignInScreen = ({ navigation }: SignInScreenProps) => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [signInError, setSignInError ] = useState('');
    const { user: { 
        handleLoginSuccess, 
      } 
    } = useAppState();

    const handleEmailValidation = (email: string): boolean => {
      const { isValid, error } = validateEmail(email);
      setEmailError(error)
      return isValid
    };

    const handlePasswordValidation = (password: string): boolean => {
      const { isValid, error } = validatePassword(password);
      console.log({ isValid, error })
      setPasswordError(error)
      return isValid
    };

    const isSignInValidated = (): boolean => {
      const validations = [
        handleEmailValidation(email),
        handlePasswordValidation(password),
      ];
      return !validations.includes(false);
    }

    async function handleSignIn() {
      let signInSuccess = false;

      if(isSignInValidated()){
        const { data, error } = await UserService.handleLogin({email, password});
        if(error) setSignInError(error);
        if(!error) setSignInError('');
        if(data) { 
          signInSuccess = true
          console.log('push to handle login success - ', data)
          handleLoginSuccess({ data });
        }
      };

      if(signInSuccess) navigation.navigate('HomeScreen')
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
                  errorMessage={emailError}
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
                  errorMessage={passwordError}
              />
              <Text color="warn" textAlign="center">{signInError}</Text>
              <Button title="Sign in" buttonStyle={styles.signInButton} onPress={() => handleSignIn()} />
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
})
