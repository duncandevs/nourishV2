import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  AuthScreen, 
  HomeScreen, 
  SearchScreen, 
  SearchResultScreen, 
  SignUpLoginScreen, 
  CalendarScreen,
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
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen name="SearchResultScreen" component={SearchResultScreen} />
          <Stack.Screen name="SignUpLoginScreen" component={SignUpLoginScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Calendar" component={CalendarScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
