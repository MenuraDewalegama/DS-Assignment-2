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

/** Save a new product by calling backend services. */
const saveProduct = (product) => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('unitPrice', product.unitPrice);
        formData.append('handOnQuantity', product.handOnQuantity);

        /* append the image to the formData, if only client did upload any image. */
        if (product.hasOwnProperty('productImage') && product.productImage) {
            formData.append('productImage', product.productImage);
        }

        const result = axios.post(`${process.env.ECOMMERCE_BACKEND_API_URL}products`, {
            data: formData
        });

        result.then(response => {
            console.log('result.then called!');
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
            resolve(response);
        }).catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            reject(error);
        });
    });
};

module.exports = {
    getAllProducts,
    getProductByID,
    saveProduct
};
