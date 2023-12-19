import { useState } from "react";
import moment from "moment";
import { Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors, Text } from "../theme";
import { todaysDateRegular } from "../utility";
import { useCalendar } from "../domains/calendar/hooks";
import { useFoodLogMacrosByDate } from "../domains/foodLog/hooks";
import { useTodaysExerciseSchedule } from "../domains/exerciseSchedule/hooks";
import RightArrowIcon from "../../assets/right-arrow.svg"
import { ProfilePicPicker } from "../components";
import { useProfilePicture, useUser } from "../domains/users/hooks";
import { ChatBottomTab } from '../components';

export const HomeScreen  = ({ navigation }) => {
    const { todaysDayOfTheWeek, todaysDate } = useCalendar();
    const { macros } = useFoodLogMacrosByDate({ date: todaysDateRegular });
    const { numberOfTodaysExercises } = useTodaysExerciseSchedule();
    const calendarDateNumber = moment(todaysDate).format('DD');
    const calendarDateMonth = moment(todaysDate).format('MMM');
    const fitnessTitle = numberOfTodaysExercises === 1 ? "EXERCISE SCHEDULED" : "EXERCISES SCHEDULED";
    const { userProfilePic, setNewProfilePic } = useProfilePicture();
    const [isProfilePickerOpen, setIsProfilePickerOpen] = useState(false);
    const { userFirstName } = useUser()

    const goToNutritionScreen = () => {
        navigation.navigate("NutritionScreen");
    };
    
    const goToFitnessScreen = () => {
        navigation.navigate("FitnessScreen");
    };

    return <View>
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <View>
                    <Text variant="header1" fontWeight="500">Hi,</Text>
                    <Text variant="header1" fontWeight="500">{userFirstName}</Text>
                </View>
                <View style={styles.userGroup}>
                    <TouchableOpacity onPress={()=>setIsProfilePickerOpen(true)}>
                        <Image source={{uri: userProfilePic}} style={styles.image} />
                    </TouchableOpacity>
                    <View style={styles.calendar}>
                        <Text color="white" variant="paragraph2">{calendarDateMonth.toLocaleUpperCase()}</Text>
                        <Text color="highlight" variant="display1">{calendarDateNumber}</Text>
                        <Text color="white" variant="paragraph3">{todaysDayOfTheWeek.toUpperCase()}</Text>
                    </View>
                </View>
                {isProfilePickerOpen && <View style={{width: '90%'}}>
                    <ProfilePicPicker  onPressPicture={(pic:string)=>setNewProfilePic(pic)} onClose={()=>setIsProfilePickerOpen(false)}/>
                </View>}
                <View style={styles.summary}>
                    <Text variant="paragraph1" fontWeight="500" marginBottom="s">Daily Summary</Text>
                    <TouchableOpacity onPress={goToFitnessScreen}>
                        <ImageBackground style={styles.summaryItem} source={{uri: 'https://plus.unsplash.com/premium_photo-1671436822885-0ef977b97959?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}} borderRadius={20}>
                            <View style={styles.fitnessTitle}>
                                <Text variant="display1" color="white">{numberOfTodaysExercises}</Text>
                                <Text fontWeight="600" variant="header3" color="white">{fitnessTitle}</Text>
                            </View>
                            <View style={styles.summarySubtitle}>
                                <Text color="white">FITNESS</Text>
                                <RightArrowIcon width={24} height={24} fill="white" />
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={goToNutritionScreen}>
                        <ImageBackground style={styles.summaryItem} source={{uri: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}} borderRadius={20}>
                            <Text fontWeight="600" color="white">YOUR DAILY MACROS</Text>
                            <View style={styles.macrosContainer}>
                                <View style={[styles.macroWrapper, styles.calories]}>
                                    <Text color="white" variant="paragraph5" fontWeight="700">CALORIES</Text>
                                    <Text color="white" variant="paragraph2" fontWeight="500">{macros?.calories || 0}</Text>
                                </View>
                                <View style={[styles.macroWrapper, styles.protein]}>
                                    <Text color="white" variant="paragraph5" fontWeight="700">PROTEIN</Text>
                                    <Text color="white" variant="paragraph2" fontWeight="500">{macros?.protein?.toFixed(0) || 0} G</Text>
                                </View>
                                <View style={[styles.macroWrapper, styles.fat]}>
                                    <Text color="white" variant="paragraph5" fontWeight="700">FAT</Text>
                                    <Text color="white" variant="paragraph2" fontWeight="500">{macros?.fat.toFixed(0) || 0} G</Text>
                                </View>
                                <View style={[styles.macroWrapper, styles.carbs]}>
                                    <Text color="white" variant="paragraph5" fontWeight="700">CARBS</Text>
                                    <Text color="white" variant="paragraph2" fontWeight="500">{macros?.carbs.toFixed(0) || 0} G</Text>
                                </View>
                            </View>
                            <View style={styles.summarySubtitle}>
                                <Text color="white">NUTRITION</Text>
                                <RightArrowIcon width={24} height={24} fill="white" />
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
        <ChatBottomTab navigation={navigation} />
    </View>
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white',
    },
    content: {
        gap: 36,
        paddingTop: 24,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: 140
    },
    image:{
        width: 156,
        height: 212,
        borderRadius: 20, 
        marginRight: 20
    },
    calendar: {
        width: 156,
        height: 212,
        borderRadius: 20,
        backgroundColor: '#232323',
        padding: 30
    },
    userGroup: {
        flexDirection: 'row',
        maxWidth: 340,
    },
    summary: {
        gap: 24
    },
    summaryItem: {
        minHeight: 196,
        padding:16,
        paddingTop:32,
        paddingBottom:24,
        gap: 16,
        borderColor: Colors.gray01,
        borderWidth: 1,
        marginBottom: 16,
        borderRadius: 20,
    },
    summarySubtitle: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    fitnessTitle: {
        flexDirection: 'row',
        gap:12,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 36
    },
    macrosContainer:{
        flexDirection: 'row',
        gap:8,
    },
    macroWrapper: {
        padding:10,
        gap: 10,
        width: 74,
        height: 94,
        borderRadius:10,
        backgroundColor: 'black'
    },
    macroText: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2
    },
    calories: {
        backgroundColor: 'black'
    },
    protein: {
        backgroundColor: '#A1CDFF'
    },
    fat: {
        backgroundColor: '#FFC876'
    },
    carbs: {
        backgroundColor: '#FF7676'
    }
})