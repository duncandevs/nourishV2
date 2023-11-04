import { TouchableOpacity } from 'react-native';
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
import ProfileIcon from "./assets/profile.svg";
import { ThemeProvider } from '@shopify/restyle';
import { theme } from './src/theme';
import * as Updates from 'expo-updates';

// Create the Stack Navigator
const Stack = createStackNavigator();

const ProfileHeader = ({ navigation }: {navigation: any}) => {
  const goToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <TouchableOpacity onPress={goToProfile} style={{paddingLeft: 16}}>
      <ProfileIcon width={24} height={24}/>
    </TouchableOpacity>
  )
};

const headerOptionsWithProfileNav = ({ navigation }: {navigation: any}) => ({ 
  headerTitle: "Nourish", 
  headerLeft: () => <ProfileHeader navigation={navigation} />
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
          <Stack.Screen name="Calendar" component={CalendarScreen}  options={{headerBackTitle:"back home"}}/>
          <Stack.Screen name="Profile" component={ProfileScreen} options={{headerTitle: 'profile', headerBackTitle:"back"}} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
