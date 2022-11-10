import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * set, get storage method of Async storage
 */
export const setJsonData = async (key: any, value: any) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.log("error=====", e);
    }
}

export const setStringData = async (key: any, value: any) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log("error=====", e);
    }
}

export const getJsonData = async (key: any) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
    } catch (e) {
        console.log("error=====", e);
    }
}

export const getStringData = async (key: any) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            console.log(value);
            return value;
        }
    } catch (e) {
        return e;
    }
}
/**
 * desc: call to clear storage
 */
export const cleanStorageItem = async (key: any) => {
    const res = await AsyncStorage.removeItem(key);
    return res;
};

