import { Macros } from "../domains/foodLog/types";

export const roundFloat = (num: number) => parseFloat(num.toFixed(1));

export const getRoundedMacros = ({ calories, fat, protein, carbs }: Macros): Macros => {
    return {
        calories,
        fat: roundFloat(fat),
        protein: roundFloat(protein),
        carbs: roundFloat(carbs)
    };
};