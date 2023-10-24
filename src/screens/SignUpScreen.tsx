import { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Button, Input } from 'react-native-elements';
import {RootStackParamList} from "./types";
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppState  } from '../state';
import { validateEmail, validateName, validatePasswordWithConfirmation } from "../utility";
import { Text } from "../theme";
import UserService from "../domains/users/services";

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUpScreen'>;

type SignUpScreenProps = {
  navigation: SignUpScreenNavigationProp;
};

export const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [ nameError, setNameError ] = useState('');
    const [ emailError, setEmailError ] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [signUpError, setSignUpError] = useState('');

    const handleNameValidation = (name: string): boolean => {
      const { isValid, error } = validateName(name);
      setNameError(error);
      return isValid;
    };

    const handleEmailValidation = (email: string): boolean => {
      const { isValid, error } = validateEmail(email);
      setEmailError(error);
      return isValid;
    }; 

    const handlePasswordValidation = (password: string, passwordConfirmation: string): boolean => {
      const { isValid, error } = validatePasswordWithConfirmation(password, passwordConfirmation)
      setPasswordError(error);
      return isValid;
    };

    const isSignUpValidated = () => {
      const validations = [
        handleNameValidation(name),
        handleEmailValidation(email),
        handlePasswordValidation(password, passwordConfirmation)
      ];
      return !validations.includes(false);
    };
  
    const SignUpWithEmail = async () => {
      let signUpSuccess = false;
      if(isSignUpValidated()){
        const { data: authData, error } = await UserService.handleSignUp({
          email,
          password,
        });
        if(authData) {
          const userId = authData?.user?.id
          await UserService.updateUser({ userId, name })
        };
        if(error) setSignUpError(error);
        if(!error) signUpSuccess = true
      };
      if(signUpSuccess) navigation.navigate('HomeScreen');
    };

    return (
      <ImageBackground style={styles.container} source={require('../../assets/nourish-background-cover-top-logo.jpeg')}>
          <View style={styles.inputGroup}>
              <Input
                  label="Name"
                  leftIcon={{ type: 'material', name: 'account-circle', size:18 }}
                  onChangeText={(text) => setName(text)}
                  value={name}
                  placeholder="full name"
                  autoCapitalize={'none'}
                  inputContainerStyle={styles.input}
                  labelStyle={styles.label}
                  errorMessage={nameError}
              />
              <Input
                  label="Email"
                  leftIcon={{ type: 'material', name: 'email', size:18 }}
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
                  leftIcon={{ type: 'material', name: 'lock', size:18 }}
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  secureTextEntry={true}
                  placeholder="Password"
                  autoCapitalize={'none'}
                  inputContainerStyle={styles.input}
                  labelStyle={styles.label}
                  errorMessage={passwordError}
              />
              <Input
                  label="Confirm Password"
                  leftIcon={{ type: 'material', name: 'lock', size:18 }}
                  onChangeText={(text) => setPasswordConfirmation(text)}
                  value={passwordConfirmation}
                  secureTextEntry={true}
                  placeholder="Password Confirmation"
                  autoCapitalize={'none'}
                  inputContainerStyle={styles.input}
                  labelStyle={styles.label}
              />
              <Button 
                title="Sign Up" 
                titleStyle={styles.buttonTitle} 
                buttonStyle={styles.signUpButton} 
                onPress={() => SignUpWithEmail()} 
              />
              <Text color="warn">{signUpError}</Text>
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
    signUpButton: {
      width: 284,
      backgroundColor: '#C3FF76',
      color: 'black',
      borderRadius: 16,
      alignSelf: 'center'
    },
    buttonTitle: {
      color: 'black'
    }
})
