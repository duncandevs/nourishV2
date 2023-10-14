import { NavigationProp, RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
    AuthScreen: undefined;
    HomeScreen: undefined;
    SearchScreen: undefined;
    SearchResultScreen: undefined;
    DetailsScreen: { itemId: number; otherParam?: string };
};