import React from 'react';
import axios from 'axios';
import { API_BASE_URL } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASYNC_CONST } from './constants';
import * as Const from "../models/api";

export const imageHeaders = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJkYTllNmZmOTBkMmIxMTI0ODI4MTczIiwiaWF0IjoxNjU4OTg2MzIyfQ.20Or7oxPotxjUok7gnA2-teG-nIPszEA3HyQsJOjyJM"
};

export const headers = {
    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJkYTllNmZmOTBkMmIxMTI0ODI4MTczIiwiaWF0IjoxNjU4OTg2MzIyfQ.20Or7oxPotxjUok7gnA2-teG-nIPszEA3HyQsJOjyJM",
    "content-type": "application/x-www-form-urlencoded",
}


export const getApi = async (url: string, params?: any) => {
    const userToken = await AsyncStorage.getItem(ASYNC_CONST.accessToken);
    console.log("token here", userToken);

    const response = await axios.get(
        Const.API_BASE_URL + url,
        {
            headers: {
                "x-access-token": userToken,
                "content-type": "application/x-www-form-urlencoded",
            },
        }
    );
    return response.data;
}

export const postApi = async (url: string, params?: any) => {
    const userToken = await AsyncStorage.getItem(ASYNC_CONST.accessToken);
    console.log("token here", userToken);
    const response = await axios.post(
        Const.API_BASE_URL + url,
        params,
        {
            headers: {
                "x-access-token": userToken,
                "content-type": "application/x-www-form-urlencoded",
            },
        }
    );
    console.log("stremmers", response.data);

    return response.data;
    // return await axios.post(
    //     API_BASE_URL + url, params,
    //     { headers }
    // )
    //     .then(response => response)
    //     .catch(error => error)
}