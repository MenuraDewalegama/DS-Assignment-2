const Router = require('@koa/router');
const {getProducts, getProduct, addProduct, removeProductById, updateProductById} = require('../api/cart.api');

const router = new Router({
    prefix: '/cart'
});

router.get('/', async ctx=>{
    ctx.body = await getProducts();
})

router.post('/',async ctx =>{
    let product = ctx.request.body;
    product = await addProduct(product);
    ctx.response.status = 201;
    ctx.body = product;
});

router.get('/:id', async ctx =>{
    const  id = ctx.params.id;
    ctx.body = await getProduct(id);
});

router.del('/:id', async ctx =>{
    const id = ctx.params.id;
   /* ctx.response.status = 204;*/
    ctx.body = await removeProductById(id);
});

router.put('/:id', async ctx =>{
    const id = ctx.params.id;
    let product = ctx.request.body;
    product = await updateProductById(id, product);
    ctx.body = product;
})

module.exports = router;