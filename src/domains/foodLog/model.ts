import Actions from "./actions"
import { FoodLogsModel  } from "./types"

export const createFoodLogsModel = (set: Function, get: Function): FoodLogsModel => ({
    foodLogs: {
        data: null,
        isLoading: false,
        error: null,
        getFoodLogs: Actions.fetchFoodLogsAction({ set, get }),
        createFoodLogIsLoading: false,
        createFoodLogError: null,
        createFoodLog: Actions.createFoodLogAction({ set, get }),
        deleteFoodLog: Actions.deleteFoodLogAction({ set, get }),
        setNewFoodLog: Actions.setNewFoodLogAction({ set, get }),
    }
})