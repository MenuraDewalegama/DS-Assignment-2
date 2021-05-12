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

/** get all users. */
router.get('/', async (ctx) => {
    console.log('get method called');
});

/** get users by ID. */
router.get('/:id', async (ctx) => {
    console.log('get with id called');
});

/** add a user. */
router.post('/', async (ctx) => {
    console.log('post method called');
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
