import { Food, FoodMealType } from "../food/types";

export type FetchFoodLogArgs = {
    userId: string;
};

export type FoodLog = {
    food_id: string;
    user_id: string;
    food: Food;
    date: string;
    quantity: number;
    meal_type: FoodMealType;
};

export type CreateFoodLogArgs = {
    foodLog: FoodLog
};

export type FoodLogsModel = {
    foodLogs: {
        data: FoodLog | null;
        isLoading: boolean;
        error: string | null;
        getFoodLogs: Function;
        createFoodLog: Function;
        createFoodLogIsLoading: boolean;
        createFoodLogError: string | null;
        getCalorieCount: Function
    }
}

export type CreateFoodLogActionArgs = {
    date: string;
    foodData: Food;
    mealType: FoodMealType;
    quantity: number;
};

export type Macros = {
    calories: number;
    fat: number;
    protein: number;
    carbs: number;
}