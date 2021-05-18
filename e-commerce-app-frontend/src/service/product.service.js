/*
@author : Dhanusha Perera
@date : 18/05/2021
*/

const axios = require('axios');

/** Get all products by calling backend services. */
const getAllProducts = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.get(`${process.env.ECOMMERCE_BACKEND_API_URL}products`);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
};


/** Get product by productID by calling backend services. */
const getProductByID = (productID) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.get(`${process.env.ECOMMERCE_BACKEND_API_URL}products/${productID}`);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
};


module.exports = {
    getAllProducts,
    getProductByID,
};
