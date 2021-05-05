const Router = require('@koa/router');
const { createProduct, getProducts, getProduct, deleteProduct, updateProduct } = require('../api/product.api');



const router = new Router({
    prefix: "/products"
});

router.get('/', async ctx => {
    ctx.body = await getProducts();
});

router.post('/', async ctx => {
    let post = ctx.request.body;
    post = await createProduct(post);
    ctx.response.status = 201;
    ctx.body = post;
});

router.get('/:id', async ctx => {
    const id = ctx.params.id;
    ctx.body = await getProduct(id);
});

router.put('/:id', async ctx => {
    const id = ctx.params.id;
    let post = ctx.request.body;
    post = await updateProduct(id, post);
    ctx.body = post;
});

router.del('/:id', async ctx => {
    const id = ctx.params.id;
    ctx.response.status = 204;
    ctx.body = await deleteProduct(id);
})

module.exports = router;