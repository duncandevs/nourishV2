export type Search = { 
    name: string, 
    calories:number, 
    protein:number, 
    carbs:number, 
    fat:number
};
export type SearchReponse = {
    error: string | null;
    isLoading: boolean;
    data: Search | null, 
}
