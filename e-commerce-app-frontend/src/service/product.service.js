/*
@author : Dhanusha Perera
@date : 18/05/2021
*/

const axios = require('axios');

/** Get all products by calling backend services.
 * @return Promise promise a result. */
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


/** Get product by productID by calling backend services.
 * @param productID ID of the product that is being retrieved.
 * @return Promise promise a result. */
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

/** Save a new product by calling backend services.
 * @param product product object with and new values but the ID .
 * @returns Promise promise a result. */
const saveProduct = (product) => {
    return new Promise((resolve, reject) => {
        const formData = configureFormDataObject(true, product);

        /* send a post request to the backend using axios. */
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

/** Update a existing product by calling backend services.
 * @param product product object with the ID and new values.
 * @returns Promise promise a result. */
const updateProduct = (product) => {
    return new Promise((resolve, reject) => {
        const formData = configureFormDataObject(false, product);

        /* send a put request to the backend using axios. */
        const result = axios.put(`${process.env.ECOMMERCE_BACKEND_API_URL}products/${product?.id}`, {
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


/** Creates a new FormData object and append product object properties accordingly.
 * @param isAdding boolean, if true formData object will be ready for adding a new product.
 * otherwise, formData object will be ready for update a product record.
 * @param product product object that is used to be saved or updated.
 * @return FormData configured formData object. */
const configureFormDataObject = (isAdding, product) => {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('unitPrice', product.unitPrice);
    formData.append('handOnQuantity', product.handOnQuantity);

    if (isAdding && product.hasOwnProperty('productImage') && product.productImage) {
        /* append the image to the formData, if only client did upload any image. */
        formData.append('productImage', product.productImage);
    }

    if (!isAdding) {
        /* ready the formData object for update operation. */
        if (product.hasOwnProperty('productImage') && product.productImage) {
            /* append the image to the formData, if only client did upload any image. */
            formData.append('productImage', product.productImage);
        } else {
            /* append the imagePath to the formData, if only client did not upload any image
            or if in case client wants to remove the existing image. */
            if (product.hasOwnProperty('imagePath') && product.imagePath) {
                formData.append('imagePath', product.imagePath);
            }
        }
    }

    return formData;
};

module.exports = {
    getAllProducts,
    getProductByID,
    saveProduct,
    updateProduct,
};
