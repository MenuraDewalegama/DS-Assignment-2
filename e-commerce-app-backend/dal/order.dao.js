/*
@author : Dhanusha Perera
@date : 12/05/2021
*/

const ObjectID = require('mongodb').ObjectID;
const DatabaseService = require('../service/database.service');

const collectionName = 'orders';
const orders = new DatabaseService(collectionName);

/** get all orders. */
const getAllOrders = () => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await orders.findAll());
        } catch (error) {
            reject(error);
        }
    });
};

/** get orders. */
const getOrder = (orderID) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await orders.findById(orderID));
        } catch (error) {
            reject(error);
        }
    });
};

/** add order. */
const addOrder = (order) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await orders.save(order));
        } catch (error) {
            reject(error);
        }
    });
};

/** update order */
const updateOrder = async (orderID, order) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await orders.update(orderID, order));
        } catch (error) {
            reject(error);
        }
    });
};

/** delete order. */
const deleteOrder = async (orderID) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await orders.delete(orderID));
        } catch (error) {
            reject(error);
        }
    });
}



module.exports = {
    getAllOrders,
    getOrder,
    addOrder,
    updateOrder,
    deleteOrder,
}
