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

export type CreateFoodResponse = Promise<{
    data: Food | null,
    error: string | null | unknown
}>;

export type FoodMealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';