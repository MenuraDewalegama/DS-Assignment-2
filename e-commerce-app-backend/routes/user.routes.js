/*
@author : Dhanusha Perera
@date : 12/05/2021
*/

const Router = require('@koa/router');

const router = new Router({
    prefix: '/users'
});

const {getAllUsers, getUser, addUser, updateUser, deleteUser} = require('../api/user.api');
const userValidation = require('./validation/user.validation');
const commonValidation = require('./validation/common.validation');
const passwordService = require('../service/password.service');

/** get all users. */
router.get('/', async (ctx) => {
    try {
        const result = await getAllUsers();
        ctx.response.type = 'application/json';
        ctx.response.status = 200;
        ctx.response.body = result;
    } catch (error) {
        ctx.response.status = 500;
        console.log(error);
    }
});

/** get users by ID. */
router.get('/:id', async (ctx) => {
    const id = ctx.request.params.id;

    /* validate input. */
    const validationResult = commonValidation.validateID(id);
    if (validationResult.length !== 0) {
        /* found errors. */
        ctx.response.status = 400;
        ctx.response.body = validationResult;
        return;
    }

    try {
        ctx.response.type = 'application/json';
        const result = await getUser(id);
        if (result) {
            ctx.response.status = 200;
            ctx.response.body = result;
        } else {
            /* no matching user found. */
            ctx.response.status = 404;
        }
    } catch (error) {
        ctx.response.status = 500;
        console.log(error);
    }
});

/** add a user. */
router.post('/', async (ctx) => {
    const user = ctx.request.body;
    /* This variable holds the encoded user password. */
    let hashedPassword;

    /* validate user input. */
    const validationResult = userValidation.validateUser(user);
    if (validationResult.length !== 0) {
        /* found errors .*/
        ctx.response.status = 400; // bad request
        ctx.response.body = validationResult;
        return;
    }

    try {
        hashedPassword = await passwordService.getEncryptedPassword(user.password);
    } catch (error) {
        ctx.response.status = 500; // internal server error.
        console.error(error);
        return;
    }

    try { /* add the user. */
        const generatedResult = await addUser({
            name: user.name,
            contactNo: user.contactNo,
            password: hashedPassword,
            type: user.type
        });
        ctx.response.type = 'application/json';
        ctx.response.status = 201; // created
        ctx.response.body = {
            'generatedId': generatedResult.insertedId
        };

    } catch (error) {
        ctx.response.status = 500; // internal server error.
        console.error(error);
    }
});


/** update a user. */
router.put('/:id', async (ctx) => {
    const id = ctx.request.params.id;
    /* This variable holds the encoded user password. */
    let hashedPassword;

    /* validate input. */
    const validationResult = commonValidation.validateID(id);
    if (validationResult.length !== 0) {
        /* found errors. */
        ctx.response.status = 400;
        ctx.response.body = validationResult;
        return;
    }

    /* check whether there is a matching record for the given id. */
    if (!await getUser(id)) {
        /* if no record found. */
        ctx.response.status = 404;
        return;
    }

    /* read the request body and get the user details. */
    let user = ctx.request.body;

    try {
        hashedPassword = await passwordService.getEncryptedPassword(user.password);
    } catch (error) {
        ctx.response.status = 500; // internal server error.
        console.error(error);
        return;
    }

    try { /* update the product. */
        const result = await updateUser(id, {
            name: user.name,
            contactNo: user.contactNo,
            password: hashedPassword,
            type: user.type
        });
        ctx.response.status = 204;
    } catch (error) {
        /* something wrong with update process. */
        ctx.response.status = 500; // internal server error.
        console.error(error);
    }

});

/** delete a user by ID. */
router.delete('/:id', async (ctx) => {
    const id = ctx.params.id;

    /* validate input. */
    const validationResult = commonValidation.validateID(id);
    if (validationResult?.length !== 0) {
        /* found errors. */
        ctx.response.status = 400;
        ctx.response.body = validationResult;
        return;
    }

    /* check whether there is a matching record for the given id. */
    try {
        const result = await getUser(id);
        if (result) {
            /* found a matching record for the given ID. */
            try {
                const result = await deleteUser(id);
                if (result?.deletedCount === 1) {
                    /* record delete successfully. */
                    ctx.response.status = 204;
                } else {
                    /* something went wrong with delete operation. */
                    ctx.response.status = 500;
                }
            } catch (error) {
                ctx.response.status = 500;
                console.error(error);
            }
        } else {
            /* no matching record found for the given ID. */
            ctx.response.status = 404;
        }

    } catch (error) {
        /* something went wrong when finding a matching record. */
        ctx.response.status = 500;
        console.error(error);
    }

});

module.exports = router;
