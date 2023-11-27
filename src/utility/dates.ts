import { 
    format, 
    endOfDay, 
    startOfDay, 
    subDays, 
    startOfMonth, 
    endOfMonth, 
    startOfWeek, 
    endOfWeek, 
    eachDayOfInterval,
    getDay,
    addMinutes,
} from 'date-fns';

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

export const getMonthlyRange = (month?:number | null, year?:number | null) => {
    let date;
    
    // Check if a month & year is provided
    if (month && year) {
        date = new Date(year, month - 1, 1);  // Months are 0-based in JavaScript
    } else {
        date = new Date();
    }

    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);

    return { 
        startOfPeriod: format(monthStart, DATE_FORMAT),
        endOfPeriod: format(monthEnd, DATE_FORMAT)
    };
};

export const getDateNow = () => format(new Date(), DATE_FORMAT);

export const getTodaysDateByFormat = (dateFormat: string = REGULAR_DATE): string => {
    return format(startOfDay(new Date()), dateFormat);
}

export const todaysDateRegular = getTodaysDateByFormat(REGULAR_DATE);

export const formatDateFromDateTime = (date: string):string => format(new Date(date), REGULAR_DATE);

export const getDaysOfCurrentWeek = () => {
    const today = new Date();
    const start = startOfWeek(today, { weekStartsOn: 1 }); // Considering Monday as the start of the week
    const end = endOfWeek(today, { weekStartsOn: 1 });

    const dates = eachDayOfInterval({ start, end });
    
    let result = {} as Record<string, string>

    const dayDateMap = dates.reduce((acc, date) => {
        const dayName = format(date, 'EEEE').toLowerCase(); // Day of the week
        acc[dayName] = format(date, 'yyyy-MM-dd'); // Date in 'YYYY-MM-DD' format
        return acc;
    }, result);
    return dayDateMap;
};

export const getTodaysDayOfTheWeek = () => {
    const today = new Date();
    return format(today, 'EEEE')?.toLowerCase();
};

export const getDayOfTheWeek = (date:string) => {
   // Create a Date object from the input
   const dateObj = new Date(date);

   // Adjust for the time zone offset to get the correct local day
   const adjustedDate = addMinutes(dateObj, dateObj.getTimezoneOffset());

   // Format the date to get the day of the week
   return format(adjustedDate, 'EEEE').toLocaleLowerCase();
};

export const formatDateHeader = (inputDate: string) => {
    const date = new Date(inputDate);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
    const day = inputDate.split('-')[2];
    const month = monthNames[date.getMonth()];
    const dayOfWeek = dayNames[date.getDay()];
  
    return `${month} ${day}, ${dayOfWeek}`?.toLocaleUpperCase();
};

export const getAppStartAndEndOfWeek = () => {
    const today = new Date();
    const startOfWeekDate = startOfWeek(today, {weekStartsOn: 1}); // force week to start on monday
    const endOfWeekDate =  endOfWeek(today, {weekStartsOn: 0}); // force week to end on sunday
    return { startOfWeekDate, endOfWeekDate };
};

export const ABBREV_DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
export const ABBREV_DAYS_FULL_STRING_MAP = {
    'mon': 'monday',
    'tue': 'tuesday',
    'wed': 'wednesday',
    'thu': 'thursday',
    'fri': 'friday',
    'sat': 'saturday',
    'sun': 'sunday'
};