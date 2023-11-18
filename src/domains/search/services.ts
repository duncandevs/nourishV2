import { asyncFetchOpenAICompletion } from "../../clients/openAiClient";
import { FetchMethod } from '../types';
import SearchService from '../../domains/search/services';
import FoodService from '../../domains/food/services';
import { Food } from "../../domains/food/types";
import { FoodLog } from "../foodLog/types";

// const completionResponse = async (prompt: string) => 
//     await openAiClient.completions.create({ model: MODEL, prompt, max_tokens:512, temperature: 0 });

/*
    NOTES on caching recent results 
        1. grab the first 50 foods generated by the user
        2. cache them locally on the device
        3. use auto completion feature on the items before performing any supabase look-ups
        4. beware of time complexity in <Array> vs <Object> especially with lookUps
*/

const MAX_RETRIES = 3;

const isValidData = (data) => {
    // Add validation logic for your data here, for example:
    return data && typeof data === 'object' && data.name && data.calories;
};

// TODO: see https://platform.openai.com/docs/api-reference/chat/create for more on chat completions and JSON schema definition
const constructSearchPrompt = (searchTerm: string, unit?:string) => {
    // if(unit){
    //     return `Estimate the number of macros for a ${unit} of ${searchTerm}.` 
    // }
    return `Estimate the number of macros for ${searchTerm}` 
}

type GetOpenAISearchPromptResultParams = {
    searchTerm: string; 
    retryCount?: number;
    unit?: string;
    quantity?: number;
};

const getOpenAISearchPromptResult = async ({ searchTerm, retryCount = 0, unit, quantity }: GetOpenAISearchPromptResultParams): Promise<FetchMethod> => {
    try {
        const prompt = constructSearchPrompt(searchTerm, unit);
        console.log('prompt - ', prompt)
        const response = await asyncFetchOpenAICompletion({ prompt });
        const generatedText = response?.choices?.[0]?.message?.function_call?.arguments;
        const data = generatedText ? JSON.parse(generatedText) : null;
        
        // Check if the data is valid
        if (!isValidData(data)) {
            // If not valid and we haven't reached our max retries, retry the function
            if (retryCount < MAX_RETRIES) {
                return getOpenAISearchPromptResult({ searchTerm, retryCount: retryCount + 1, unit, quantity });
            } else {
                // TODO: log the error
                // Max retries reached, return an error
                return { data: null, error: 'Maximum retries reached and data is still invalid.' };
            }
        }
        // set data name with search term
        if(data) data.name = searchTerm;
        
        return { data, error: null };
    } catch (error) {
        return { data: null, error };
    }
};

type UseAISearchResult = Promise<{data: Food | null, error:string | null}> 

/*
    How to get around the quantity sizing issue
    Add unit to food ie 16 oz -> steak
    Make the unique key the <name, unit>
        DB MODEL
            1. Add Unit to Food
            2. Add quantity to FoodLog
        AI Search 
            1. Add quantity to search params
*/

type UserFoodSearchParams = {
    recents: FoodLog[] | null | undefined;
    searchTerm: string;
    unit?: string;
    quantity?: number;
}

export const useFoodSearch = async ({ recents, searchTerm, unit, quantity } : UserFoodSearchParams): UseAISearchResult => {
    let food: Food | null = null;
    let error: string | null = null;
    const foodName = searchTerm.trim().toLocaleLowerCase();
    // check if food exists in recent logs;
    const recentFoodLog = recents?.find((item)=>item.food.name === foodName);
    if(recentFoodLog) food = recentFoodLog?.food;

    // check if food is in the db
    // if(!recentFoodLog){
    //   const { data, error: fetchFoodError }= await FoodService.fetchFoodByName({ foodName });
    //   if(data) food = data
    // };

    // get ai search result
    if(!food) {
      const {data: newFood, error: searchError} = await SearchService.getOpenAISearchPromptResult({ searchTerm: foodName, unit, quantity });
      food = newFood;
      if(searchError) error = searchError;
    };

    return { data: food, error }
}

export default {
    getOpenAISearchPromptResult,
    useFoodSearch,
}