
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { useState, useEffect } from 'react';
import { getTodaysDayOfTheWeek, todaysDateRegular, getDaysOfCurrentWeek } from "../../utility";
import { DaysOfTheWeekMap, DayOfWeek } from './types';

const calendarKeys = {
    selectedDate: 'selectedDate'
};

export const useSelectedDate = () => {
    const queryClient = useQueryClient();
    
    // Fetch and cache the selected date
    const { data: selectedDate } = useQuery(calendarKeys.selectedDate, () => todaysDateRegular);

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
    const { selectedDate, updateSelectedDate } = useSelectedDate();
    const daysOfTheWeekMap: DaysOfTheWeekMap = getDaysOfCurrentWeek();
    //@ts-ignore
    const daysOfTheWeekArray: DayOfWeek[] = Object.keys(daysOfTheWeekMap);

    const [isSelectedDateAfterToday, setIsSelectedDateAfterToday] = useState(false);
    const [isSelectedDateBeforeToday, setIsSelectedDateBeforeToday] = useState(false);
    const [isSelectedDateToday, setIsSelectedDateToday] = useState(!isSelectedDateBeforeToday && !isSelectedDateAfterToday);

    useEffect(()=>{
        if(selectedDate) setIsSelectedDateAfterToday(
            new Date(selectedDate) > new Date(todaysDate)
        );
    }, [selectedDate]);

    useEffect(()=>{
        if(selectedDate) setIsSelectedDateBeforeToday(
            new Date(selectedDate) < new Date(todaysDate)
        );
    }, [selectedDate]);

    useEffect(()=>{
        if(selectedDate) setIsSelectedDateToday(
            selectedDate === todaysDate
        );
    }, [selectedDate]);

    return {
        todaysDayOfTheWeek,
        todaysDate,
        selectedDate,
        daysOfTheWeekMap,
        daysOfTheWeekArray,
        updateSelectedDate,
        isSelectedDateAfterToday,
        isSelectedDateBeforeToday,
        isSelectedDateToday,
    };
};



