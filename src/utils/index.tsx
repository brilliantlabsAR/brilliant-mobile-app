import { v4 as uuidv4 } from "uuid";
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

// NOTE: this is NOT a cryptographically-strong random string generator
export function GenerateRandomString() {
    const r: string = (Math.random() + 1).toString(36).substring(2);
    return r;
}

export function GenerateUuid(): string {
    return uuidv4();
}

