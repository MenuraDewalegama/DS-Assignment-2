/*
@author : Dhanusha Perera
@date : 13/05/2021
*/

const commonValidation = require('./common.validation');
const productValidation = require('./product.validation');
const userValidation = require('./user.validation');

/** Validate order.
 *
 * @param order order object.
 * @returns Promise with validation errors if found any. Otherwise boolean true.*/
const validateOrder = async (order) => {
    let errorMessage = '';

    /* customer */
    if (order.hasOwnProperty('customer')) {
        if (order?.customer?.length === 0) {
            errorMessage += 'Invalid: Customer Details for the order is required.\n';
        }

        /* if customer id is not valid. */
        if (!commonValidation.validateURL('users', order?.customer)) {
            errorMessage += 'Invalid: Customer field is invalid and it should be a URI containing 24 digit(12 bytes) ID.\n';
        }

        try {
            await validateUserOfTheOrder(order);
        } catch (error) {
            /* found errors .*/
            errorMessage += `Invalid user: ${error.message}`;
        }

    } else {
        errorMessage += 'Invalid: Customer Details for the order is required.\n';
    }

    /* order details. */
    if (order.hasOwnProperty('orderDetails')) {
        if (!order?.orderDetails || !order?.orderDetails[0] || order?.orderDetails?.length === 0) {
            errorMessage += 'Invalid: Order Details array is required. It should not be empty.\n';
        }

    } else {
        errorMessage += 'Invalid: Order Details for the order is required.\n';
    }

    /* delivery details. */
    if (order.hasOwnProperty('deliveryDetails')) {
        if (order?.deliveryDetails?.length === 0) {
            errorMessage += 'Invalid: Delivery Details for the order is required. It should not be empty.\n';
        }
    } else {
        errorMessage += 'Invalid: Delivery Details for the order is required.\n';
    }

    return new Promise((resolve, reject) => {
        if (errorMessage.length === 0) {
            resolve(true);
        } else {
            reject(errorMessage);
        }
    });
};


/** Validate the customer(user) URI.
 * @param order order object.
 * @returns Promise with validation result. */
const validateUserOfTheOrder = async (order) => {
    /* here, order.customer means the user */
    return await userValidation.checkRecordByURI(order?.customer);
}

/** validate order-details array(more than one).
 *
 * @param orderDetails array containing order-details.
 * @returns Promise with validation result.*/
const validateOrderDetails = async (orderDetails) => {
    let result = [];

    if (Array.isArray(orderDetails)) {
        for (const orderDetail of orderDetails) {

            try {
                await validateOrderDetailData(orderDetail);
                /* no errors found with the order-detail. */
            } catch (validationResultWithError) {
                /* after validating order-detail, found some errors. */
                if (validationResultWithError?.message?.length >= 0) {
                    result.push(validationResultWithError);
                }
            }

        }

    }

    return new Promise(async (resolve, reject) => {
        if (result.length === 0) {
            resolve(result);
        } else {
            /* result contains errors. */
            reject(result);
        }
    });
}

/** Validate a single order-detail.
 *
 * @param orderDetail order-detail to be validated.
 * @returns Promise with validation result.
 * if validation successful then validation.message will be an empty string.
 * */
const validateOrderDetailData = async (orderDetail) => {
    let validationResult = {
        providedURL: orderDetail?.product,
        code: 200,
        message: ''
    };

    if (!orderDetail.hasOwnProperty('product')) {
        validationResult.message += 'Invalid: OrderDetail should be contain "product" property.';
    }

    if (!orderDetail.hasOwnProperty('unitPrice')) {
        validationResult.message += 'Invalid: OrderDetail should be contain "unitPrice" property.';
    } else {
        if (!(/^\d+$|^\d+[.]\d\d$/.test(orderDetail?.unitPrice))) {
            validationResult.message += 'Invalid: "unitPrice" should be number(allowed: two digit fractions).';
        }
    }

    if (!orderDetail.hasOwnProperty('orderedQuantity')) {
        validationResult.message += 'Invalid: OrderDetail should be contain "orderedQuantity" property.';
    } else {
        if (!(/^\d+$/.test(orderDetail?.orderedQuantity))) {
            validationResult.message += 'Invalid: "orderedQuantity" should be an integer.';
        }
    }

    if (validationResult.message.length === 0) {
        try {
            const product = await productValidation
                .checkRecordByURI(orderDetail?.product);

            /* check whether the handOnQuantity is enough or not. */
            if (!(product?.handOnQuantity >= orderDetail?.orderedQuantity)) {
                validationResult.code = 400;
                validationResult.message += 'Invalid: Ordered Quantity is exceeding hand on quantity.';
            }

        } catch (reason) {
            validationResult.code = reason?.code;
            validationResult.message += reason?.message;
        }
    }

    return new Promise((resolve, reject) => {
        if (validationResult.message.length === 0) {
            validationResult.code = 200;
            resolve(validationResult);
        } else {
            validationResult.code = 400;
            reject(validationResult);
        }
    });
}

module.exports = {
    validateOrder,
    validateUserOfTheOrder,
    validateOrderDetails
}
