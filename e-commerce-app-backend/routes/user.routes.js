/*
@author : Dhanusha Perera
@date : 12/05/2021
*/

const Router = require('@koa/router');
const path = require('path');
const fs = require('fs');
const mimeTypes = require('mime-types');

const router = new Router({
    prefix: "/users"
});

const {getAllUsers, getUser, addUser, updateUser, deleteUser} = require('../api/user.api');

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
    const id = ctx.params.id;

    /* validate input. */
    // TODO: validate input.

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

    /* validate user input. */
    // TODO: validate user input.

    
    try { /* add the user. */
        const generatedResult = await addUser({
            name: user.name,
            contactNo: user.contactNo,
            password: user.password, // TODO: encrypt the password
            type: user.type
        });
        ctx.response.type = 'application/json';
        ctx.response.status = 201; // created
        ctx.response.body = {
            "generatedId": generatedResult.insertedId
        };

    } catch (error) {
        ctx.response.status = 500; // internal server error.
        console.error(error);
    }
});


/** update a user. */
router.put('/:id', async (ctx) => {
    console.log('put method called');
});

/** delete a user by ID. */
router.delete('/:id', async (ctx) => {
    console.log('delete method called');
});

module.exports = router;