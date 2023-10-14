import { handleSearchAction } from './actions';

// auth model & actions
export const createSearchModel = (set: Function, get: Function) => ({
    search: {
        error: null, 
        isLoading: false, 
        data: null,
        handleSearch: handleSearchAction({ set }),
    }
});

