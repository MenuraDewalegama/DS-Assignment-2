/*
@author : Dhanusha Perera
@date : 18/05/2021
*/

const axios = require('axios');
import sha256 from 'crypto-js/sha256';
import {printErrorResponse} from './error.service';

/** Call the auth API and get a token using userID and password.
 * @param userID user's ID
 * @param password password of the user.
 * @return Promise with result. if auth success then resolves true, otherwise reject error. */
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
            // TODO: JWT should be handled here
            if (response.status === 200) {
                const jwtToken = response.data;
                console.log(response);
                console.log(`received JWT: ${jwtToken}`);
                /* save encoded JWT Token. */
                sessionStorage.setItem(sha256(process.env.JWT_TOKEN_NAME), jwtToken);

                /* get user information from the backend.
                * save the relevant information. */
                getUserByID(userID).then(authUser => {
                    console.log(`Authenticated user details: ${authUser}`);
                    /* store current authenticated user ID in session storage. */
                    sessionStorage.setItem(sha256(process.env.AUTHENTICATED_USER_ID),
                        btoa(JSON.stringify(authUser.id)));
                    /* store current authenticated user name in session storage. */
                    // sessionStorage.setItem(sha256(process.env.AUTHENTICATED_USER_NAME),
                    //     btoa(JSON.stringify(authUser.name)));
                    resolve(true);
                }).catch((error) => {
                    printErrorResponse(error);
                });
            }
        }).catch(error => {
            reject(error);
        });
    });
};


/** Get user by userID by calling backend services.
 * @param userID ID of the user to be retrieved.
 * @return Promise with result. if success then resolves the user data, otherwise reject the error. */
const getUserByID = (userID) => {
    return new Promise((resolve, reject) => {
        axios.get(`${process.env.ECOMMERCE_BACKEND_API_URL}users/${userID}`).then(response => {
            if (response.status === 200) {
                console.log(response.data);
                resolve(response.data);
            }
        }).catch(error => {
            reject(error);
        });
    });
};

/** User registration(Add a new user) by calling backend services.
 * @param user user object containing values.
 * @return Promise a promise with a result. If successful then, resolve the response,
 * otherwise reject the error. */
const addUser = (user) => {
    return new Promise((resolve, reject) => {
        axios.post(`${process.env.ECOMMERCE_BACKEND_API_URL}users`, {
            data: JSON.stringify(user)
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
