import { useEffect, useState } from "react"
import { useAppState } from "../../state";
import FoodLogsService from "../foodLog/services";
import { FoodMealType } from "../food/types";
import { FoodLog } from "./types";

export const useFoodLogsByUser = () => {
    const { 
        user: { data: user },
        foodLogs: { 
            data, 
            error,
            isLoading,
            getFoodLogs,
        } 
    } = useAppState();
    const userId = user?.id;

    useEffect(()=>{
        if(userId) getFoodLogs({ userId })
    }, [userId])

    return { data, error, isLoading }
};

export const useFoodLogMacrosByDate = ({ date }: {date: string}) => {
    const { data: foodLogs } = useFoodLogsByUser();
    const [ macros, setMacros ] = useState({
        calories: 0,
        fat: 0,
        protein: 0,
        carbs: 0
    });
    useEffect(()=>{
        setMacros(
            FoodLogsService.getMacrosByDate({ foodLogs, date })
        );
    }, [foodLogs])

    return { macros }
};

export const useFoodLogMealCaloriesByDate = ({ date }: {date: string}) => {
    const { data: foodLogs } = useFoodLogsByUser();
    const [ mealCalories, setMealCalories ] = useState({
        breakfast: 0,
        lunch: 0,
        dinner: 0,
        snacks: 0,
    });
    useEffect(()=>{
        setMealCalories(
            FoodLogsService.getCalorieMealStatsByDate({ foodLogs, date })
        );
    }, [foodLogs])

    return { mealCalories }
};


export const useFoodLogsByDateAndMealType = ({ date, mealType }: {date: string, mealType: FoodMealType | null}) => {
    const { data: foodLogs } = useFoodLogsByUser();
    const [ filteredFoodLogs, setFilteredFoodLogs ] = useState<FoodLog[]>([]);

    useEffect(()=>{
        if(!mealType) {
            setFilteredFoodLogs(FoodLogsService.getFoodLogsByDate({ foodLogs, date }))
        } else {
            setFilteredFoodLogs(FoodLogsService.getFoodLogsByMealTypeAndDate({ foodLogs, date, mealType}));
        }

    }, [foodLogs, setFilteredFoodLogs, mealType]);
    
    return { foodLogs: filteredFoodLogs };
};