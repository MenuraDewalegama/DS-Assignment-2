/*
@author : Dhanusha Perera
@date : 13/05/2021
*/

const validateOrder = (order) => {
    let errorMessage = '';

    /* customer */
    if (order.hasOwnProperty('customer')) {
        if (order?.customer?.length === 0) {
            errorMessage += 'Invalid: Customer Details for the order is required.\n';
        }
    } else {
        errorMessage += 'Invalid: Customer Details for the order is required.\n';
    }

    /* order details. */
    if (order.hasOwnProperty('orderDetails')) {
        if (order?.orderDetails?.length === 0) {
            errorMessage += 'Invalid: Order Details for the order is required.\n';
        }
    } else {
        errorMessage += 'Invalid: Order Details for the order is required.\n';
    }

    /* delivery details. */
    if (order.hasOwnProperty('deliveryDetails')) {
        if (order?.deliveryDetails?.length === 0) {
            errorMessage += 'Invalid: Delivery Details for the order is required.\n';
        }
    } else {
        errorMessage += 'Invalid: Delivery Details for the order is required.\n';
    }

    return errorMessage;
};

module.exports = {
    validateOrder,
}
