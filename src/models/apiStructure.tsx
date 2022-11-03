import React from 'react';
import axios from 'axios';
import { API_BASE_URL } from './api';

const headers = {
    "Content-type": "application/json"
};

export const getApi = async (url: string) => {
    return await axios.get(
        API_BASE_URL + url,
        { headers }
    )
        .then(response => response.data)
        .catch(error => error)
}

export const postApi = async (url: string, params = {}, token?: string) => {
    return await axios.post(
        API_BASE_URL + url, params,
        { headers }
    )
        .then(response => response.data)
        .catch(error => error)
}




export const REQUEST_METHODS = Object.freeze({
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
});

const { POST, GET, DELETE } = REQUEST_METHODS;

const api = async (
    url: string,
    { method = 'GET', params = {}, headers = {} },
    isToken: boolean = false
): Promise<any> => {
    const axiosUrl = API_BASE_URL + url
    const axiosMethod: any = method.toUpperCase();
    // const accessToken = await getToken();
    // const token = accessToken || '';
    let customerInfo = {};
    const authHeader = {
        Authorization: 'kjjm',
        ...customerInfo
    };
    const normalHeader = { 'Content-Type': 'multipart/form-data' };

    const axiosHeader = { ...headers, ...authHeader };
    const axiosRef = axios.create({
        method: axiosMethod,
        url: axiosUrl,
        data: params,
        headers: isToken ? axiosHeader : normalHeader
    });
    let apiCall: Promise<any>;
    switch (axiosMethod) {
        case POST:
            apiCall = axiosRef.post(axiosUrl, params);
            break;

        case GET:
            apiCall = axiosRef.get(axiosUrl, params);
            break;

        case DELETE:
            apiCall = axiosRef.delete(axiosUrl, { data: params });
            break;

        default:
            apiCall = axiosRef.get(axiosUrl, params);
            break;
    }

    return new Promise((resolve, reject) => {
        return apiCall
            .then((response) => {
                return resolve(response);
            })
            .catch((error) => {
                return reject(error);
            });
    });
}

export default api;