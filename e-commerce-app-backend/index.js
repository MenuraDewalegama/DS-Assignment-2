const Koa = require('koa');
const dotenv = require('dotenv').config();
require('../e-commerce-app-backend/dal/db');
//const CartRoutes = require('../e-commerce-app-backend/routes/cart.routes');
const bodyparser = require('koa-bodyparser');



const app = new Koa();
const PORT = process.env.PORT;

app.use(bodyparser());

//app.use(CartRoutes.routes()).use(CartRoutes.allowedMethods());

app.use(ctx => {
    ctx.body = 'Hello world';
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});