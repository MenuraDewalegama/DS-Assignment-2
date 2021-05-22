/*
@author : Dhanusha Perera
@date : 19/05/2021
*/
// const axios = require('axios');
import axios from './axios.service';

/** Add a new order by calling backend services.
 * @param order order object containing values for an order.
 * @return Promise a promise with a result. if successful then resolve the response,
 * otherwise reject the error. */
const addOrder = (order) => {
    return new Promise((resolve, reject) => {
        axios.post(`${process.env.ECOMMERCE_BACKEND_API_URL}order`, {
            data: JSON.stringify(order)
        }).then(response => {
            /* response received */
            resolve(response);
        }).catch(error => {
            /* response with error. */
            reject(error);
        });
    });
};

module.exports = {
    addOrder
};
