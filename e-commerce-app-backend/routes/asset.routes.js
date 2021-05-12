/*
@author : Dhanusha Perera
@date : 12/05/2021
*/

const Router = require('@koa/router');
const koaSend = require('koa-send');

const router = new Router({
    prefix: '/assets'
});

/** serve product images. */
router.get('/products/:id', async (ctx) => {
    try {
        await koaSend(ctx, ctx.path);
    } catch (error) {
        ctx.response.status = 500;
        console.log(error);
    }
});

// router.get('/customers/:id', async (ctx) => {
//     try {
//         await koaSend(ctx, ctx.path);
//     } catch (error) {
//         ctx.response.status = 500;
//         console.log(error);
//     }
// });


module.exports = router;

