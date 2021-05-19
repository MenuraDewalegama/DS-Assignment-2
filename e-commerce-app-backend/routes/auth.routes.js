/*
@author : Dhanusha Perera
@date : 19/05/2021
*/
const Router = require('@koa/router');

const router = new Router({
    prefix: '/auth'
});

/** Authenticate the user.*/
router.post('/', ctx => {
    console.log(ctx);
});


module.exports = router;
