/*
@author : Dhanusha Perera
@date : 12/05/2021
*/

const userDAO = require('../dal/user.dao');

/* User API */

/** get all users. */
const getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await userDAO.getAllUsers());
        } catch (error) {
            reject(error);
        }
    });
};

/** get user by given userID. */
const getUser = (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await userDAO.getUser(userID));
        } catch (error) {
            reject(error);
        }
    });
};


/** add a new user. */
const addUser = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await userDAO.getUser(user));
        } catch (error) {
            reject(error);
        }
    });
};

/** update a user. */
const updateUser = (userID, userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await userDAO.updateUser(userID, userData));
        } catch (error) {
            reject(error);
        }
    });
};

/** delete a new user. */
const deleteUser = (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await userDAO.updateUser(userID));
        } catch (error) {
            reject(error);
        }
    });
};


module.exports = {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser
}
