/*
@author : Dhanusha Perera
@date : 18/05/2021
*/

const axios = require('axios');

/** Get user by userID by calling backend services. */
const getUserByID = (userID) => {
    return new Promise((resolve, reject) => {
        axios.get(`${process.env.ECOMMERCE_BACKEND_API_URL}/users`).then(response => {
            if (response.status === 200) {
                console.error(response.data);
                resolve(response.data);
            }
        }).catch(error => {
            console.error(error);
            reject(error);
        });
    });
};


module.exports = {
    getUserByID,
}
