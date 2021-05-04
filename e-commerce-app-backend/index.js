const Koa = require('koa');
const dotenv = require('dotenv').config();
require('../e-commerce-app-backend/dal/db');


const app = new Koa();
const PORT = process.env.PORT;

app.use(ctx => {
    ctx.body = 'Hello world';
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});