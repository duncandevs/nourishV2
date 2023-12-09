import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "../theme";

import { FlatList } from "react-native";
import CardioSvg from "../../assets/exercise-cardio.svg";
import ArmsSvg from "../../assets/exercise-arms.svg";
import LegsSvg from "../../assets/exercise-legs.svg";
import ShouldersSvg from "../../assets/exercise-shoulders.svg";
import BackSvg from "../../assets/exercise-back.svg";
import ChestSvg from "../../assets/exercise-chest.svg";
import StretchSvg from "../../assets/exercise-stretch.svg";
import SportSvg from "../../assets/exercise-sport.svg";
import { ExerciseCategory } from "../domains/exercise/types";



type ExerciseCategoryListProps = {
    categories: ExerciseCategory[],
    handleSelectCategory: (category: ExerciseCategory) => void
};

type CategoryProps = {
    onSelect: (category: ExerciseCategory) => void,
    category: ExerciseCategory
}

export const ExerciseCategoryMap: Record<string, any> = {
    'cardio': <CardioSvg /> ,
    'arms': <ArmsSvg />,
    'legs': <LegsSvg />,
    'core': null,
    'shoulders': <ShouldersSvg />,
    'back': <BackSvg />,
    'chest': <ChestSvg />,
    'stretch': <StretchSvg />,
    'sport': <SportSvg />,
    'pilates': null,
};

const Category = ({ category, onSelect }: CategoryProps) => {
    return <TouchableOpacity style={styles.container} onPress={()=>onSelect(category)}>
        <View style={styles.icon}>
            {ExerciseCategoryMap?.[category]}
        </View>
        <Text>{category}</Text>
    </TouchableOpacity>
};

export const ExerciseCategoryList = ({ categories, handleSelectCategory } : ExerciseCategoryListProps) => {
    return <FlatList 
        data={categories}
        renderItem={({item}:{item: ExerciseCategory}) => <Category category={item} onSelect={handleSelectCategory}/>}
        horizontal
        showsHorizontalScrollIndicator={false}
    />
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginRight: 4
    },
    icon: {
        height: 69
    }
})