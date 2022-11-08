import React from 'react';
import axios from 'axios';
import { API_BASE_URL } from './api';

export const imageHeaders = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJkYTllNmZmOTBkMmIxMTI0ODI4MTczIiwiaWF0IjoxNjU4OTg2MzIyfQ.20Or7oxPotxjUok7gnA2-teG-nIPszEA3HyQsJOjyJM"
};

export const headers = {
    "x-access-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJkZTIxNjM3MDljYmM3MWY3NmNlYTczIiwiaWF0IjoxNjY3NTQwNTMyfQ.qeGLM118MZym8g-9U8pV-riFt0_eyi_emqh28KzbNnY",
};

export const getToken = {
    // fetch token from async storage
}

// export const getApi = async (url: string) => {
//     return await axios.get(
//         API_BASE_URL + url,
//         { headers }
//     )
//         .then(response => response.data)
//         .catch(error => error)
// }

// export const postApi = async (url: string, params = {}, token?: string) => {
//     return await axios.post(
//         API_BASE_URL + url, params,
//         { headers }
//     )
//         .then(response => response)
//         .catch(error => error)
// }