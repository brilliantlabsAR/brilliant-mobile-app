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
        .then(response => response)
        .catch(error => error)
}