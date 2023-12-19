import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItemToAsyncStorage = async (key:string, value:any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting item in AsyncStorage:', error);
    };
  };

export const getItemFromStorage = async (key:string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value != null) {
            return JSON.parse(value);
        }
    } catch (error) {
        console.error('Error getting item from AsyncStorage:', error);
    }
    return null;
};

export const deleteItemFromStorage = async (key:string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error deleting item from AsyncStorage:', error);
    }
};