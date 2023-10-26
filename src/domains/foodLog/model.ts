import { createFoodLogAction, fetchFoodLogsAction, deleteFoodLogAction } from "./actions"
import { FoodLogsModel  } from "./types"

export const createFoodLogsModel = (set: Function, get: Function): FoodLogsModel => ({
    foodLogs: {
        data: null,
        isLoading: false,
        error: null,
        getFoodLogs: fetchFoodLogsAction({ set, get }),
        createFoodLogIsLoading: false,
        createFoodLogError: null,
        createFoodLog: createFoodLogAction({ set, get }),
        deleteFoodLog: deleteFoodLogAction({ set, get }),
    }
})