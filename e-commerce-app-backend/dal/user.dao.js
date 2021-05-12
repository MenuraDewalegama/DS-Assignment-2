/*
@author : Dhanusha Perera
@date : 12/05/2021
*/

const ObjectID = require('mongodb').ObjectID;
const DatabaseService = require('../service/database.service');

const collectionName = 'users';
const users = new DatabaseService(collectionName);

/** get all users. */
const getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await users.findAll());
        } catch (error) {
            reject(error);
        }
    });
};

/** get users. */
const getUser = (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await users.findById(userID));
        } catch (error) {
            reject(error);
        }
    });
};

/** add user. */
const addUser = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await users.save(user));
        } catch (error) {
            reject(error);
        }
    });
};

/** update user */
const updateUser = async (userID, user) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await users.update(userID, user));
        } catch (error) {
            reject(error);
        }
    });
};

/** delete user. */
const deleteUser = async (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await users.delete(userID));
        } catch (error) {
            reject(error);
        }
    });
}


module.exports = {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
}
