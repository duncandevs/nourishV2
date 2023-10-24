Tables

Users:
    user_id (Primary Key)
    name - index
    password_hash
    email - index
    date_joined
    ...

Foods:
    food_id (Primary Key) - ie: 1234
    name - index ie: A slice of pepperoni pizza
    calories - ie: 300
    protein - ie: 10g
    carbs - ie: 40g
    fats - ie: 30g
    ...

FoodLogs:
    log_id (Primary Key)
    user_id (Foreign Key to Users) - index ie: 1
    food_id (Foreign Key to Foods) - index ie: 1234
    date - index - ie: 10/02/2023 12:00pm
    quantity (how much of the food was consumed)  - ie: 1
    meal_type, ENUM('breakfast', 'lunch', 'dinner', 'snack') - ie: lunch
    ...
    (user_id, date) - composite index -> since this pairing may be a common search 


PROMPT EXAMPLE
Estimate the number of calories in a typical cappuccino. Provide a final numerical estimate only without any further explanation. Format the response in JSON with the following params { name: string, calories:number, protein:number, carbs:number, fat:number}. Do not include any other text just the JSON

CALENDAR
- react-native-calendars
- https://github.com/wix/react-native-calendars

STYLE & THEMING
- https://reactnativeelements.com/docs/4.0.0-rc.1/customization/color

ASSETS CACHING
- https://github.com/chelseafarley/AppLoadingDemo/blob/main/App.js

LOADING SPINNERS
- https://loading.io/

FULL UI KIT
- https://www.figma.com/file/WF0LRZmhqu8C5QHexGMGkf/Universal-Icon-Set-v2.6-%7C-Preview?type=design&node-id=0-1&mode=design&t=BBLw4ADpO9E47z3H-0


