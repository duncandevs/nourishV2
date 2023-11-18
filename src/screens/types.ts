import { Food } from '../domains/food/types';

export type RootStackParamList = {
    AuthScreen: undefined;
    HomeScreen: undefined;
    SearchScreen: undefined;
    SearchResultScreen: {data: Food | null};
    SignInScreen: undefined;
    SignUpScreen: undefined;
    Calendar: undefined;
    Profile: undefined;
    FoodVisionScreen: undefined;
};