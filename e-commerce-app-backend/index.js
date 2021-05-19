const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const koaBody = require('koa-body');
const dotenv = require('dotenv').config();
require('./util/database.util');

const app = new Koa();
const PORT = process.env.PORT;

/* enable CORS. */
const cors = require('@koa/cors');
app.use(cors());

/* enable koa-body. */
app.use(koaBody({multipart: true}));

/* directory paths. */
const assetDir = `${process.cwd()}${path.sep}assets`;
const productsDir = `${assetDir}${path.sep}products`;

/* create assets dir if not exists. */
if (!fs.existsSync(assetDir)) {
    /* creating assets dir. */
    fs.mkdirSync(assetDir);
}

/* create products dir if not exists. */
if (!fs.existsSync(productsDir)) {
    /* creating products dir. */
    fs.mkdirSync(productsDir);
}


/* routes. */
// static contents are handle by AssetsRoutes
const AuthRoutes = require('../e-commerce-app-backend/routes/auth.routes');
const AssetsRoutes = require('../e-commerce-app-backend/routes/asset.routes');
const CartRoutes = require('../e-commerce-app-backend/routes/cart.routes');
const ProductRoutes = require('../e-commerce-app-backend/routes/product.routes');
const UserRoutes = require('../e-commerce-app-backend/routes/user.routes');
const OrderRoutes = require('../e-commerce-app-backend/routes/order.routes');


app.use(AuthRoutes.routes()).use(AuthRoutes.allowedMethods());
app.use(AssetsRoutes.routes()).use(AssetsRoutes.allowedMethods());
/* JWT protected routes should place user this line. */
app.use(CartRoutes.routes()).use(CartRoutes.allowedMethods());
app.use(ProductRoutes.routes()).use(ProductRoutes.allowedMethods());
app.use(UserRoutes.routes()).use(UserRoutes.allowedMethods());
app.use(OrderRoutes.routes()).use(OrderRoutes.allowedMethods());


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
