import { NavigationProp, RouteProp } from '@react-navigation/native';
import { Food } from '../domains/food/types';

export type RootStackParamList = {
    AuthScreen: undefined;
    HomeScreen: undefined;
    SearchScreen: undefined;
    SearchResultScreen: {data: Food | null};
    SignUpLoginScreen: undefined;
    Calendar: undefined;
};