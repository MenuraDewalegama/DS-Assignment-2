/*
@author : Dhanusha Perera
@date : 18/05/2021
*/

// const axios = require('axios');
import axios from './axios.service';
import sha256 from 'crypto-js/sha256';

/** Call the auth API and get a token using userID and password.
 * @param userID user's ID
 * @param password password of the user.
 *
 * @return Promise with result. if auth success then resolves JWT, otherwise reject error. */
const authenticate = ({userID, password}) => {
    const body = {
        username: userID,
        password: password
    };

    return new Promise((resolve, reject) => {
        axios.post(`${process.env.ECOMMERCE_BACKEND_API_URL}auth`, {}, {
            auth: body,
            responseType: 'text'
        }).then(response => {
            /* JWT should be available here. */
            if (response.status === 200) {
                const jwtToken = response.data;
                /* set bearer token globally for axios. */
                axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
                // setBearerTokenForAxiosGlobally(jwtToken);
                /* save encoded JWT Token in session storage. */
                setValueOnSessionStorage(sha256(process.env.JWT_TOKEN_NAME), jwtToken);
                // setValueOnSessionStorage(sha256(process.env.AUTHENTICATED_USER_ID), btoa(userID));
                resolve(jwtToken);
            }
        }).catch(error => {
            reject(error);
        });
    });
};


/** Set key-value pair in the session storage.
 * @param key unique key to identify the attached value.
 * @param value the value to be saved. */
const setValueOnSessionStorage = (key, value) => {
    /* save encoded JWT Token. */
    sessionStorage.setItem(key, value);
};


/** Get the value by the key in sessionStorage.
 * @param key unique key to identify the attached value.
 * @return String value for that given key. */
const getValueFromSessionStorage = (key) => {
    return sessionStorage.getItem(key);
};


/** Set axios global config, the Bearer token. */
// const setBearerTokenForAxiosGlobally = (jwtToken) => {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
// };


/** Get user by userID by calling backend services.
 * @param userID ID of the user to be retrieved.
 *
 * @return Promise with result. if success then resolves the user data, otherwise reject the error. */
const getUserByID = (userID) => {
    return new Promise((resolve, reject) => {
        axios.get(`${process.env.ECOMMERCE_BACKEND_API_URL}users/${userID}`).then(response => {
            if (response.status === 200) {
                console.log(response.data);
                resolve(response.data);
            }
        }).catch(error => {
            console.error('getUserByID', error);
            reject(error);
        });
    });
};


/** User registration(Add a new user) by calling backend services.
 * @param user user object containing values.
 *
 * @return Promise a promise with a result. If successful then, resolve the response,
 * otherwise reject the error. */
const addUser = (user) => {
    console.log('addUser : ', user);
    return new Promise((resolve, reject) => {
        axios.post(`${process.env.ECOMMERCE_BACKEND_API_URL}users`, JSON.stringify(user), {
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
};


module.exports = {
    authenticate,
    getUserByID,
    addUser
};
