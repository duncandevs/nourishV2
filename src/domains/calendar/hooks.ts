
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { useState } from 'react';
import { getTodaysDayOfTheWeek, todaysDateRegular, getDaysOfCurrentWeek } from "../../utility";
import { DaysOfTheWeekMap, DayOfWeek } from './types';

const calendarKeys = {
    selectedDate: 'selectedDate'
};

export const useSelectedDate = () => {
    const todaysDayOfTheWeek =  getTodaysDayOfTheWeek();
    const queryClient = useQueryClient();

    // Fetch and cache the selected date
    const { data: selectedDate } = useQuery(calendarKeys.selectedDate, () => todaysDayOfTheWeek);

    // Define a mutation to update the selected date
    const { mutate: updateSelectedDate } = useMutation(
        newDate => Promise.resolve(newDate),
        {
            onSuccess: (newDate) => {
                // Update the cached selected date on successful mutation
                queryClient.setQueryData(calendarKeys.selectedDate, newDate);
            }
        }
    );
    return { selectedDate, updateSelectedDate };
};

export const useCalendar = () => {
    const todaysDayOfTheWeek =  getTodaysDayOfTheWeek();
    const todaysDate = todaysDateRegular;
    const [selectedDayOfTheWeek, setSelectedDayOfTheWeek ]= useState(todaysDayOfTheWeek);
    const { selectedDate, updateSelectedDate } = useSelectedDate();

    const daysOfTheWeekMap: DaysOfTheWeekMap = getDaysOfCurrentWeek();
    //@ts-ignore
    const daysOfTheWeekArray: DayOfWeek[] = Object.keys(daysOfTheWeekMap);

    return {
        todaysDayOfTheWeek,
        todaysDate,
        selectedDate,
        selectedDayOfTheWeek,
        daysOfTheWeekMap,
        daysOfTheWeekArray,
        updateSelectedDate,
    };
};



