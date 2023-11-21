import { Macros } from "../domains/foodLog/types";

export const roundFloat = (num: number) => {
    if(num) return parseFloat(num.toFixed(1))
    return num;
};

export const getRoundedMacros = ({ calories, fat, protein, carbs }: Macros): Macros => {
    return {
        calories,
        fat: roundFloat(fat),
        protein: roundFloat(protein),
        carbs: roundFloat(carbs)
    };
};