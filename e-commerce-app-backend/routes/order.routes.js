/*
@author : Dhanusha Perera
@date : 13/05/2021
*/

const Router = require('@koa/router');

const router = new Router({
    prefix: "/orders"
});

const {getAllOrders, getOrder, addOrder, updateOrder, deleteOrder} = require('../api/order.api');
const orderValidation = require('./validation/order.validation');
const commonValidation = require('./validation/common.validation');

/** get all orders. */
router.get('/', async (ctx) => {
    try {
        const result = await getAllOrders();
        ctx.response.type = 'application/json';
        ctx.response.status = 200;
        ctx.response.body = result;
    } catch (error) {
        ctx.response.status = 500;
        console.log(error);
    }
});

/** get orders by ID. */
router.get('/:id', async (ctx) => {
    const id = ctx.request.params.id;

    /* validate input. */
    const validationResult = commonValidation.validateID(id);
    if (validationResult.length !== 0) {
        /* found errors. */
        ctx.response.status = 400;
        ctx.response.body = validationResult;
        return;
    }

    try {
        ctx.response.type = 'application/json';
        const result = await getOrder(id);
        if (result) {
            ctx.response.status = 200;
            ctx.response.body = result;
        } else {
            /* no matching order found. */
            ctx.response.status = 404;
        }
    } catch (error) {
        ctx.response.status = 500;
        console.log(error);
    }
});

/** add a order. */
router.post('/', async (ctx) => {
    const order = ctx.request.body;

    try { /* validate order input. */
        await orderValidation.validateOrder(order);
    } catch (validationErrors) {
        /* found errors .*/
        ctx.response.status = 400; // bad request
        ctx.response.body = validationErrors;
        return;
    }

    /* validate order-details. */
    try {
        await orderValidation?.validateOrderDetails(order?.orderDetails);
    } catch (error) {
        /* found errors .*/
        ctx.response.status = 400; // bad request
        let errorMessage = '';
        for (const errorElement of error) {
            console.log(errorElement);
            errorMessage += `${errorElement?.providedURL} : ${errorElement?.message}\n`;
        }
        ctx.response.type = 'text/plain';
        ctx.response.body = errorMessage;
        return;
    }

    try { /* add the order. */
        const generatedResult = await addOrder({
            customer: order.customer,
            orderDetails: order.orderDetails,
            deliveryDetails: order.deliveryDetails,
            orderDate: new Date(Date.now()).toISOString()
        });
        ctx.response.type = 'application/json';
        ctx.response.status = 201; // created
        ctx.response.body = {
            "generatedId": generatedResult.insertedId
        };

    } catch (error) {
        ctx.response.status = 500; // internal server error.
        console.error(error);
    }
});


/** update a order. */
router.put('/:id', async (ctx) => {
    const id = ctx.request.params.id;

    /* read the request body and get the order details. */
    let order = ctx.request.body;

    try { /* validate order input. */
        await orderValidation.validateOrder(order);
    } catch (validationErrors) {
        /* found errors .*/
        ctx.response.status = 400; // bad request
        ctx.response.body = validationErrors;
        return;
    }

    /* check whether there is a matching record for the given id. */
    if (!await getOrder(id)) {
        /* if no record found. */
        ctx.response.status = 404;
        return;
    }

    try { /* update the product. */
        const result = await updateOrder(id, {
            customer: order.customer,
            orderDetails: order.orderDetails,
            deliveryDetails: order.deliveryDetails
            // orderDate: Date.now()
        });
        ctx.response.status = 204;
    } catch (error) {
        /* something wrong with update process. */
        ctx.response.status = 500; // internal server error.
        console.error(error);
    }

});

/** delete a order by ID. */
router.delete('/:id', async (ctx) => {
    const id = ctx.params.id;

    /* validate input. */
    const validationResult = commonValidation.validateID(id);
    if (validationResult?.length !== 0) {
        /* found errors. */
        ctx.response.status = 400;
        ctx.response.body = validationResult;
        return;
    }

    /* check whether there is a matching record for the given id. */
    try {
        const result = await getOrder(id);
        if (result) {
            /* found a matching record for the given ID. */
            try {
                const result = await deleteOrder(id);
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
