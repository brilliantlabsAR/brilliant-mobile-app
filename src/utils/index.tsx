import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { ASYNC_CONST } from "../models";
import { getStringData } from "./asyncUtils";

/**
 * desc: Method check for iOS platform
 * @returns boolean
 */
export const isIOS = () => {
    return Platform.OS === 'ios';
};

/**
 * desc: Method calculate countdown time 
 * @returns number
 */
export const countdownTimer = (timer: number) => {
    var m = Math.floor(timer % 3600 / 60);
    var s = Math.floor(timer % 3600 % 60);
    return ((m < 10 ? `0${m} :` : `${m} :`) + (s < 10 ? `0${s}` : `${s}`))
};

const getToken = async () => {
    const token = await AsyncStorage.getItem(ASYNC_CONST.accessToken);
    return token;
};

