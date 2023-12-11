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
import CalendarSvg from "../../assets/exercise-calendar.svg";
import CoreSvg from "../../assets/exercise-core.svg";
import { ExerciseCategory } from "../domains/exercise/types";

type ExerciseCategoryListProps = {
    categories: ExerciseCategory[],
    handleSelectCategory?: (category: ExerciseCategory) => void,
    selectedCategory?: ExerciseCategory | null,
};

type CategoryProps = {
    onSelect?: (category: ExerciseCategory) => void,
    category: ExerciseCategory,
    selectedCategory?: ExerciseCategory | null
}

export const ExerciseCategoryMap: Record<string, any> = {
    'all': <CalendarSvg />,
    'cardio': <CardioSvg /> ,
    'arms': <ArmsSvg />,
    'legs': <LegsSvg />,
    'core': <CoreSvg />,
    'shoulders': <ShouldersSvg />,
    'back': <BackSvg />,
    'chest': <ChestSvg />,
    'stretch': <StretchSvg />,
    'sport': <SportSvg />,
    'pilates': null,
};

const Category = ({ category, onSelect, selectedCategory }: CategoryProps) => {
    const isSelected = selectedCategory === category;
    const textColor = isSelected ? "blue" : "black" 
    return <TouchableOpacity style={styles.container} onPress={()=>onSelect && onSelect(category)}>
        <View style={styles.icon}>
            {ExerciseCategoryMap?.[category]}
        </View>
        <Text color={textColor} fontWeight="500">{category}</Text>
    </TouchableOpacity>
};

export const ExerciseCategoryList = ({ categories, handleSelectCategory, selectedCategory } : ExerciseCategoryListProps) => {
    return <FlatList 
        data={categories}
        renderItem={({item}:{item: ExerciseCategory}) => 
            <Category 
                category={item} 
                onSelect={handleSelectCategory}
                selectedCategory={selectedCategory}
            />
        }
        horizontal
        showsHorizontalScrollIndicator={false}
    />
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginRight: 6
    },
    icon: {
        height: 69,
        width: 69,
    }
})