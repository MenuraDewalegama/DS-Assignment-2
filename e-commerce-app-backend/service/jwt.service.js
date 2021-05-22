/*
@author : Dhanusha Perera
@date : 19/05/2021
*/

const jwt = require('jsonwebtoken');
const ms = require('ms');

/** Generate JSON Web Token.
 * @param payload { name: string }
 * @return Promise promise with a result, if success then resolve the generated Token.
 * otherwise reject the error. */
const generateJWT = (payload) => {
    const user = {name: payload.name};
    return new Promise((resolve, reject) => {
        try { /*  Generate a JWT using selected Registered Claims,
        and sign it to send to the the client. */
            const token = jwt.sign(user, process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY, {
                expiresIn: ms('1d'), // ONE DAY
                audience: process.env.JWT_ACCESS_TOKEN_AUDIENCE,
                subject: process.env.JWT_ACCESS_TOKEN_SUBJECT,
                issuer: process.env.JWT_ACCESS_TOKEN_ISSUER
            });
            resolve(token);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    generateJWT
};

