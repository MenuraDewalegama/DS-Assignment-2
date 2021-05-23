/*
@author : Dhanusha Perera
@date : 19/05/2021
*/
const Router = require('@koa/router');
const userAPI = require('../api/user.api');
const bcrypt = require('bcrypt');
const generateJWT = require('../service/jwt.service');

const router = new Router({
    prefix: '/auth'
});

/** Authenticate the user.*/
router.post('/', async ctx => {
    // console.log(ctx);
    // const BASIC_AUTH_TOKEN = ctx.request.headers?.authorization;
    const BASIC_AUTH_TOKEN = ctx.request.headers['authorization'];
    console.log(BASIC_AUTH_TOKEN);
    if (!(BASIC_AUTH_TOKEN) || !(BASIC_AUTH_TOKEN.startsWith('Basic '))) {
        /* 401 - NOT AUTHORIZED. */
        ctx.response.status = 401;
        return;
    }
    /* separate the base64Encoded part. */
    const base64EncodedBasicToken = BASIC_AUTH_TOKEN.split(' ')[1];
    /* decode the base64Encoded part. */
    const [userID, password] = atob(base64EncodedBasicToken).split(':');

    console.log(userID, password);
    try {
        const userFromDB = await userAPI.getUser(userID);
        await comparePasswords(password, userFromDB?.password);

        try {
            /* let's create the token, and send it to the client. */
            ctx.response.status = 200;
            ctx.response.type = 'text/plain';
            const generatedJWT = await generateJWT.generateJWT({name: userFromDB?.name});
            console.log(generatedJWT);
            ctx.response.body = generatedJWT;
        } catch (error) {
            console.log(error);
            ctx.response.status = 500;
        }

    } catch (error) {
        console.log(error);
        if (error === false){
            /* 401 - NOT AUTHORIZED. */
            ctx.response.status = 401;
        } else {
            ctx.response.status = 500;
        }
    }
});

const comparePasswords = (plainPassword, hashedPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await bcrypt.compare(plainPassword, hashedPassword);
            if (result) {
                /* password is verified. */
                resolve(true);
            } else {
                reject(false);
            }
        } catch (error) {
            console.error('Something went wrong when comparing passwords!');
        }
    });
};


module.exports = router;
