import { Food, FoodMealType } from "../food/types";

export type FetchFoodLogArgs = {
    userId: string;
};

export type FetchFoodLogByDateRangeArgs = {
    userId: string;
    startOfPeriod: string;
    endOfPeriod: string;
};

export type FetchMonthlyFoodLogsByUserIdArgs = {
    userId: string;
    month?: number | null;
    year?: number | null;
}

export type FoodLog = {
    id: string;
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
        getCalorieCount: Function;
        deleteFoodLog: Function;
        setNewFoodLog: Function;
    }
}

export type CreateFoodLogActionArgs = {
    date: string;
    foodData: Food;
    mealType: FoodMealType;
    quantity: number;
};

export type CreateFoodLogFromSearchArgs = {
    userId: string;
    date: string;
    foodData: Food;
    mealType: FoodMealType;
    quantity: number;
};

export type CreateFoodLogFromSearchResults = Promise<{
    data: FoodLog | null,
    error: string | null
}>;

export type Macros = {
    calories: number;
    fat: number;
    protein: number;
    carbs: number;
};

export type FoodLogsDateMap = Record<string, FoodLog[]>;

export type Month = {
    "dateString": string,
    "day": number | null,
    "month": number | null,
    "timestamp": number | null,
    "year": number | null,
};

export type Day = {
    "dateString": string,
    "day": number | null,
    "month": number | null,
    "timestamp": number | null,
    "year": number | null,
  }

export type FoodLogsAvgMacros = Record<string, Macros>

