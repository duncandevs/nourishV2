import { NavigationProp, RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
    AuthScreen: undefined;
    HomeScreen: undefined;
    SearchScreen: undefined;
    SearchResultScreen: undefined;
    SignUpLoginScreen: undefined;
    Calendar: undefined;
    DetailsScreen: { itemId: number; otherParam?: string };
};