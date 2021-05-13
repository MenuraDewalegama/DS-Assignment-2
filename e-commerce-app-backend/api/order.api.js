/*
@author : Dhanusha Perera
@date : 13/05/2021
*/

const orderDAO = require('../dal/order.dao');

/* Order API */

/** get all orders. */
const getAllOrders = () => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await orderDAO.getAllOrders());
        } catch (error) {
            reject(error);
        }
    });
};

/** get order by given orderID. */
const getOrder = (orderID) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await orderDAO.getOrder(orderID));
        } catch (error) {
            reject(error);
        }
    });
};


/** add a new order. */
const addOrder = (order) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await orderDAO.addOrder(order));
        } catch (error) {
            reject(error);
        }
    });
};

/** update a order. */
const updateOrder = (orderID, orderData) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await orderDAO.updateOrder(orderID, orderData));
        } catch (error) {
            reject(error);
        }
    });
};

/** delete a new order. */
const deleteOrder = (orderID) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await orderDAO.deleteOrder(orderID));
        } catch (error) {
            reject(error);
        }
    });
};


module.exports = {
    getAllOrders,
    getOrder,
    addOrder,
    updateOrder,
    deleteOrder
}
