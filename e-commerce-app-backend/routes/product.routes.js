const Router = require('@koa/router');
const path = require('path');
// const koaBody = require('koa-body');
const fs = require('fs');
const mimeTypes = require('mime-types');
const {addProduct, getProducts, getProduct, deleteProduct, updateProduct} = require('../api/product.api');
const {isProductIdValid, isProductImagePathProvided, validateProduct} = require('./validation/product.validation');

/* assets and products dir */
const assetDir = `${process.cwd()}${path.sep}assets`;
const productsDir = `${assetDir}${path.sep}products`;
const productsDefaultDir = `${assetDir}${path.sep}products${path.sep}default.jpg`;

const router = new Router({
    prefix: "/products"
});


/** get all products. */
router.get('/', async ctx => {
    try {
        const posts = await getProducts();
        if (posts.length >= 0) {
            ctx.response.status = 200;
            ctx.response.type = 'application/json';
            ctx.response.body = JSON.stringify(posts);
        }
    } catch (error) {
        ctx.response.status = 500;
        // console.log(error);
    }
});


/** get product by given ID. */
router.get('/:id', async ctx => {
    const id = ctx.params.id;

    /* check the given id is valid or not. */
    try {
        await isProductIdValid(id);
    } catch (error) {
        ctx.response.status = 400;
        ctx.response.body = error;
        return;
    }

    try {
        ctx.response.type = 'application/json';
        const result = await getProduct(id);
        if (result) {
            ctx.response.status = 200;
            ctx.response.body = result;
        } else {
            ctx.response.status = 404;
        }
    } catch (error) {
        ctx.response.status = 500;
        console.log(error);
    }
});


/** insert a product. */
router.post('/', async ctx => {
    const product = ctx.request.body;

    if (product?._id || product?._id === '' || product?._id >= 0) {
        ctx.response.type = 'application/json';
        ctx.response.status = 400; // bad request
        ctx.response.message = 'Error: Product id should not be specified.';
        return;
    }

    /* go through validation process. */
    const validationResult = validateProduct(product);
    if (validationResult) {
        /* validation process found some errors. */
        ctx.response.status = 400; // bad request
        ctx.response.body = validationResult; // send errors
    } else if (isProductImagePathProvided(product)) {
        /* validation process found some errors. */
        ctx.response.status = 400; // bad request
        ctx.response.body = "ImagePath is not required.";
    } else {
        /* validation process success. */

        try { /* add the product. */
            const generatedResult = await addProduct({
                name: product.name,
                description: product.description,
                unitPrice: product.unitPrice,
                handOnQuantity: product.handOnQuantity
            }, ctx.request.files?.productImage);
            ctx.response.type = 'application/json';
            ctx.response.status = 201; // created
            ctx.response.body = {
                "generatedId": generatedResult.insertedId
            };

        } catch (error) {
            ctx.response.status = 500; // internal server error.
            console.error(error);
        }
    }

});


/** update the product. */
router.put('/:id', async ctx => {
    const id = ctx.params.id;
    let existingProductRecord;
    /* check the given id is valid or not. */
    try {
        await isProductIdValid(id);
    } catch (error) {
        ctx.response.status = 400;
        ctx.response.body = error;
        return;
    }

    /* check whether there is a matching record for the given id. */
    try {
        const result = await getProduct(id);
        existingProductRecord = result;
        if (!result) {
            /* if no record found. */
            ctx.response.status = 404;
        }
    } catch (error) {
        /* something went wrong when finding a matching record. */
        ctx.response.status = 500;
        console.error(error);
        return;
    }

    /* read the request body and get the product details. */
    let product = ctx.request.body;

    /* go through validation process. */
    const validationResult = validateProduct(product);
    if (validationResult) {
        /* found some errors in the input in validation process. */
        ctx.response.status = 400; // bad request
        ctx.response.body = validationResult; // send errors
    } else if (!isProductImagePathProvided(product) && (!ctx.request.files?.productImage)) {
        /* imagePath and productImage both are not provided. */
        ctx.response.status = 400; // bad request
        ctx.response.body = "Invalid: ImagePath and ProductImage both are NOT provided. \n" +
            "ImagePath should be provided to keep or remove the ProductImage. \n" +
            "ProductImage should be provided only to update the image.\n";

    } else if (isProductImagePathProvided(product) && ctx.request.files?.productImage) {
        /* imagePath and productImage both are provided. */
        ctx.response.status = 400; // bad request
        ctx.response.body = "Invalid: ImagePath and ProductImage both are provided. \n" +
            "ImagePath should be provided to keep or remove the ProductImage. \n" +
            "ProductImage should be provided only to update the image.\n";

    } /*else if (isProductImagePathProvided(product) &&
        (product?.imagePath !== null && product?.imagePath?.length == 0)) {
        /!* imagePath and productImage both are provided. *!/
        ctx.response.status = 400; // bad request
        ctx.response.body = "ImagePath is invalid. \n" +
            "ImagePath should be provided to keep or remove the ProductImage. Accept only null or imagePath. \n";

    }*/ else {
        /* validation process success. */

        try { /* update the product. */
            const result = await updateProduct(id, {
                    name: product.name,
                    description: product.description,
                    unitPrice: product.unitPrice,
                    handOnQuantity: product.handOnQuantity,
                    imagePath: (product?.imagePath?.length === 0) ? null : product?.imagePath
                },
                ctx.request.files?.productImage,
                existingProductRecord);
            ctx.response.status = 204;
            if (result.modifiedCount === 1) {
                /* update successful. */
                ctx.response.status = 204;
            }
        } catch (error) {
            /* something wrong with update process. */
            ctx.response.status = 500; // internal server error.
            console.error(error);
        }
    }

});


/** delete a product by given ID. */
router.del('/:id', async ctx => {
    const id = ctx.params.id;

    /* check the given id is valid or not. */
    try {
        await isProductIdValid(id);
    } catch (error) {
        ctx.response.status = 400;
        ctx.response.body = error;
        return;
    }

    try {
        const result = await getProduct(id);
        if (result) {
            /* found a matching record for the given ID. */
            try {
                const result = await deleteProduct(id);
                if (result?.deletedCount === 1) {
                    /* record delete successfully. */
                    ctx.response.status = 204;
                } else {
                    /* something went wrong with delete operation. */
                    ctx.response.status = 500;
                }
            } catch (error) {
                ctx.response.status = 500;
                console.error(error);
            }
        } else {
            /* no matching record found for the given ID. */
            ctx.response.status = 404;
        }

    } catch (error) {
        /* something went wrong when finding a matching record. */
        ctx.response.status = 500;
        console.error(error);
    }

});

module.exports = router;
