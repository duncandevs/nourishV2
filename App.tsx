import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  AuthScreen, 
  HomeScreen, 
  SearchScreen, 
  SearchResultScreen, 
  SignInScreen, 
  CalendarScreen,
  ProfileScreen,
  SignUpScreen,
} from './src/screens';
import { ThemeProvider } from '@shopify/restyle';
import { theme } from './src/theme';

// Create the Stack Navigator
const Stack = createStackNavigator();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AuthScreen">
          <Stack.Screen name="AuthScreen" component={AuthScreen} options={{ headerShown: false }} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="SearchScreen" component={SearchScreen} options={{headerTitle: 'search', headerBackTitle:"back"}} />
          <Stack.Screen name="SearchResultScreen" component={SearchResultScreen} options={{headerTitle: '', headerBackTitle:"back"}} />
          <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Calendar" component={CalendarScreen}  options={{headerBackTitle:"back"}}/>
          <Stack.Screen name="Profile" component={ProfileScreen} options={{headerTitle: 'profile', headerBackTitle:"back"}} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
