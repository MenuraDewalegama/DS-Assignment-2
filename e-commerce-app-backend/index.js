const Koa = require('koa');
const dotenv = require('dotenv').config();
require('./util/database.util');
const CartRoutes = require('../e-commerce-app-backend/routes/cart.routes');
const ProductRoutes = require('../e-commerce-app-backend/routes/product.routes');
const bodyparser = require('koa-bodyparser');



const app = new Koa();
const PORT = process.env.PORT;

app.use(bodyparser());

app.use(CartRoutes.routes()).use(CartRoutes.allowedMethods());
app.use(ProductRoutes.routes()).use(ProductRoutes.allowedMethods())

app.use(ctx => {
    ctx.body = 'Hello world';
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
