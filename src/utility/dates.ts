import { format, endOfDay, startOfDay, subDays } from 'date-fns';

const END_OF_DAY_STRING = "T23:59:59.999Z";
const DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";
const REGULAR_DATE = "yyyy-MM-dd";

export const getTodaysDate = () => format(startOfDay(new Date()), DATE_FORMAT);

export const getEndOfDayDate = () => format(endOfDay(new Date()), DATE_FORMAT);

export const getLocalTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

export const getDateRangeFromToday = (days: number) => {
    const todaysDate = endOfDay(new Date());
    const startOfPeriod = subDays(todaysDate, days);
    /*
        startOfPeriod -  2023-09-30 T23:59:59.999Z
        endOfPeriod -  2023-10-07 T23:59:59.999Z
    */
    return { 
        startOfPeriod: format(startOfPeriod, DATE_FORMAT),
        endOfPeriod: format(todaysDate, DATE_FORMAT)
    };
};

export const getDateNow = () => format(new Date(), DATE_FORMAT);

export const getTodaysDateByFormat = (dateFormat: string = REGULAR_DATE): string => {
    return format(startOfDay(new Date()), dateFormat);
}

export const todaysDateRegular = getTodaysDateByFormat(REGULAR_DATE);