export type Food = {
    id?: string;
    name: string;
    calories: number;
    fat: number;
    carbs: number;
    protein: number
};

export type CreateFoodArgs = {
    food: Food
};

export type FetchFoodArgs = {
    foodName: string
};

export type FoodResponse = Promise<{
    data: Food | null,
    error: string | null
}>;

export type FoodMealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';