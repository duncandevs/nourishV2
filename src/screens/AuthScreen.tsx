import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { supabaseClient } from '../clients/supabaseClient'
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
  const { user: { error: loginError, isLoading, handleLogin, data: userData} } = useAppState()

  async function signInWithEmail() {
    await handleLogin({ email, password })
  };

  async function signUpWithEmail() {
    const { error, data } = await supabaseClient.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error)
  };

  useEffect(()=>{
    if(userData) navigation.replace('HomeScreen')
    if(loginError) Alert.alert(loginError)
  }, [userData, loginError])

  return (
    <View style={styles.container}>
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
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign in" disabled={isLoading} onPress={() => signInWithEmail()} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign up" disabled={isLoading} onPress={() => signUpWithEmail()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})