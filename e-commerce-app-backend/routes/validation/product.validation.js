/*
@author : Dhanusha Perera
@date : 10/05/2021
*/

const path = require('path');

/** checks the _id is provided.
 * @return boolean if the product id is provided, return true. otherwise false. */
const isProductIdProvided = async (product) => {
    return new Promise((resolve, reject) => {
        if (product?._id || product?._id === '' || product?._id >= 0) {
            resolve(true);
        } else {
            reject(false);
        }
    });
}

const isProductIdValid = (productID) => {
    /* Regular Expressions. */
    const idRegEx = /^[A-Za-z0-9]+$/;
    let errorMessage = "";
    return new Promise((resolve, reject) => {
        /* validate product ID. */
        try {
            require('mongodb').ObjectID(productID);

            if (!idRegEx.test(productID)) {
                errorMessage += `Product id is invalid. ID should be contained only letters (case does not matter) and numbers.\n`;
                reject(errorMessage);
            } else {
                resolve(true);
            }
        } catch (error) {
            errorMessage = "Product id is invalid. Product id value should be 12 bytes in length. " +
                "ID should be contained only letters (case does not matter) and numbers.";
            reject(errorMessage);
        }

    })
}


const isProductImagePathProvided = (product) => {
    return (product.hasOwnProperty('imagePath'));
}

/** validate product object,
 * @return errorMessage; if no errors found then errorMessage object should be an empty string,
 * otherwise errorMessage object will be contain with respective errors. */
const validateProduct = (product) => {
    let errorMessage = "";

    /* Regular Expressions. */
    // const idRegEx = /^[A-Za-z0-9]+$/;
    // const nameRegEx = /^[\w][\w .]+$/;
    // const descriptionRegEx = /^[A-Za-z][\w .]+$/;
    const unitPriceRegEx = /^\d{1,}$|^\d+[.]\d\d$/;
    const handOnQuantityRegEx = /^\d+$/;

    /* validate product ID. */
    // if ((!product?._id) || (!idRegEx.test(product?._id))) {
    //     errorMessage += `Product id is invalid. ID should be contained only letters (case does not matter) and numbers.\n`;
    // }

    /* validate product name. */
    if (product.hasOwnProperty('name')) {
        if ((!product?.name) && (product?.name?.length >= 0)) { //  || (!nameRegEx.test(product?.name))
            errorMessage += `Product name is invalid. It should not be empty. \n`;
            // Product name should be contained only letters, space, fullstops, underscore.
        }
    } else {
        errorMessage += `Product name is required. It should not be empty. \n`;
    }

    /* validate product description */
    if (product.hasOwnProperty('description')) {
        if ((!product?.description) && (product?.description?.length >= 0)) {
            errorMessage += `Product Description is invalid. It should not be empty. \n`;
            // and only accept only letters, numbers, space, fullstops, underscore.
        }
    } else {
        errorMessage += `Product description is required. It should not be empty. \n`;
    }

    /* validate product unitPrice */
    if (product.hasOwnProperty('unitPrice')) {
        if ((!unitPriceRegEx.test(product?.unitPrice))) {
            errorMessage += `Unit Price is invalid. Only accept numbers with two digits as fractions.\n`;
        }
    } else {
        errorMessage += `Unit Price is required. Only accept numbers with two digits as fractions.\n`;
    }

    /* validate product handOnQuantity */
    if (product.hasOwnProperty('handOnQuantity')) {
        if ((!handOnQuantityRegEx.test(product?.handOnQuantity))) {
            errorMessage += `HandOnQuantity is invalid. HandOnQuantity should be an positive integer.\n`;
        }
    } else {
        errorMessage += `HandOnQuantity is required. It should be an positive integer.\n`;
    }

    /* validate product imagePath */
    // if (product.hasOwnProperty('imagePath')) {
    //     errorMessage += `ImagePath is not required.\n`;
    // }

    /* validate product imagePath,
    if image path is not provided or missing,
    then default image path will be set. */
    // if (product?.imagePath || (product?.imagePath.length == 0)) {
    //     product.imagePath = `${process.cwd()}${path.sep}assets${path.sep}products${path.sep}default.jpg`;
    // }

    return errorMessage;
}


module.exports = {
    validateProduct,
    isProductIdValid,
    isProductImagePathProvided
}


// const testing =validateProduct({
//     _id: '',
//     name: '',
//     description: '',
//     unitPrice: 0,
//     handOnQuantity: 0
// });

// const obj = {
//     _id: "609945551cfac379e18794d4",
//     name: 'keyboard',
//     description: 'None',
//     unitPrice: 15,
//     handOnQuantity: 0,
//     imagePath: ''
// }
// const testing = validateProduct(obj);

