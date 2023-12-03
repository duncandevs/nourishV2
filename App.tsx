import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from 'react-query';
import { 
  AuthScreen, 
  HomeScreen,
  NutritionScreen, 
  SearchScreen, 
  SearchResultScreen, 
  SignInScreen, 
  CalendarScreen,
  ProfileScreen,
  SignUpScreen,
  FoodVisionScreen,
  FitnessScreen,
  StopWatchScreen,
  ExerciseSearchScreen,
  ExerciseSessionScreen,
} from './src/screens';
import { ThemeProvider } from '@shopify/restyle';
import { theme } from './src/theme';
import * as Updates from 'expo-updates';
import { ProfileIconHeader } from "./src/components";

const STALETIME = 60 * 60 * 1000; // set to 5 minutes

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALETIME,
      retry: 0,
    },
  }
});

// Create the Stack Navigator
const Stack = createStackNavigator();

const headerOptionsWithProfileNav = ({ navigation }: {navigation: any}) => ({ 
  headerTitle: "Home", 
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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="AuthScreen">
            <Stack.Screen name="AuthScreen" component={AuthScreen} options={{ headerShown: false }} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={headerOptionsWithProfileNav}/>
            <Stack.Screen name="FitnessScreen" component={FitnessScreen} options={{headerTitle: 'Fitness', headerBackTitle:"back"}}/>
            <Stack.Screen name="NutritionScreen" component={NutritionScreen} options={{headerTitle: 'Nutrition', headerBackTitle:"back"}}/>
            <Stack.Screen name="SearchScreen" component={SearchScreen} options={{headerTitle: 'search', headerBackTitle:"back"}} />
            <Stack.Screen name="SearchResultScreen" component={SearchResultScreen} options={{headerTitle: '', headerBackTitle:"back"}} />
            <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Calendar" component={CalendarScreen}  options={{headerBackTitle:"back"}}/>
            <Stack.Screen name="Profile" component={ProfileScreen} options={{headerTitle: 'profile', headerBackTitle:"back"}} />
            <Stack.Screen name="FoodVisionScreen" component={FoodVisionScreen} options={{headerBackTitle:"", headerTitle: 'food vision'}} />
            <Stack.Screen name="StopWatchScreen" component={StopWatchScreen} />
            <Stack.Screen name="ExerciseSearchScreen" component={ExerciseSearchScreen} />
            <Stack.Screen name="ExerciseSessionScreen" component={ExerciseSessionScreen} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
