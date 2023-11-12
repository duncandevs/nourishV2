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
  CameraScreen,
} from './src/screens';
import { ThemeProvider } from '@shopify/restyle';
import { theme } from './src/theme';
import * as Updates from 'expo-updates';
import { ProfileIconHeader } from "./src/components";

// Create the Stack Navigator
const Stack = createStackNavigator();

const headerOptionsWithProfileNav = ({ navigation }: {navigation: any}) => ({ 
  headerTitle: "Nourish", 
  headerLeft: () => <ProfileIconHeader navigation={navigation} />
})

const App = () => {
  // Check if any updates are available and fetch updates
  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      // alert(`Error fetching latest Expo update: ${error}`);
    }
  };

  // Call OTA Update Function on App load
  onFetchUpdateAsync();

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AuthScreen">
          <Stack.Screen name="AuthScreen" component={AuthScreen} options={{ headerShown: false }} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={headerOptionsWithProfileNav}/>
          <Stack.Screen name="SearchScreen" component={SearchScreen} options={{headerTitle: 'search', headerBackTitle:"back"}} />
          <Stack.Screen name="SearchResultScreen" component={SearchResultScreen} options={{headerTitle: '', headerBackTitle:"back"}} />
          <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Calendar" component={CalendarScreen}  options={{headerBackTitle:"back"}}/>
          <Stack.Screen name="Profile" component={ProfileScreen} options={{headerTitle: 'profile', headerBackTitle:"back"}} />
          <Stack.Screen name="CameraScreen" component={CameraScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
