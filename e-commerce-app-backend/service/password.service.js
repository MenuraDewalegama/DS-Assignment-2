/*
@author : Dhanusha Perera
@date : 19/05/2021
*/

const bcrypt = require('bcrypt');
const saltRounds = 10;

/** Encrypt the given password.
 * @plainPassword password to be encrypted.
 * @return Promise promise with a result. if success resolve hashedPassword,
 * otherwise reject the error. */
const getEncryptedPassword = (plainPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
            resolve(hashedPassword);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getEncryptedPassword
};
