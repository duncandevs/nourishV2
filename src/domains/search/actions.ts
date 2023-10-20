import {produce} from 'immer';
import SearchService from "./services";
import FoodService from "../food/services";
import { ActionParams } from '../types';

export const handleSearchAction = ({ set }: ActionParams): Function => 
    async ({ searchTerm }: {searchTerm:string}) => {
        // set is loading to true
        set(produce((state: any) => { 
            state.search.isLoading = true 
        }));

        // get search results
        const { data: searchResults, error: searchError } = 
            await SearchService.getOpenAISearchPromptResult(searchTerm);

        set(produce((state: any) => {
            state.search.error = searchError
            if(!searchError && searchResults) state.search.data = searchResults
        }));

        // set isLoading to false
        set(produce((state: any) => { 
            state.search.isLoading = false 
        }));
    };