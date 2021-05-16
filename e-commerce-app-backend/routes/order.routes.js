/*
@author : Dhanusha Perera
@date : 13/05/2021
*/

const Router = require('@koa/router');

const router = new Router({
    prefix: "/orders"
});

const {getAllOrders, getOrder, addOrder, updateOrder, deleteOrder} = require('../api/order.api');
const {getAllOrderDetails} = require('../api/order.api');
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

    try {
        const context = await validationProcessOfOrderID(id, ctx);
        ctx.response.status = context.response.status;
        ctx.response.body = context.response.body;

    } catch (errorContext) {
        ctx.response.status = errorContext.response.status;
        ctx.response.body = errorContext.response.body;
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


/* order-details ====================================================================================================*/

router.get('/:orderID/order-details', async (ctx) => {
    const orderID = ctx.request.params?.orderID;

    try {
        const context = await validationProcessOfOrderID(orderID, ctx);

        if (context.response.status === 200) {
            try {
                const resultOrderDetails = await getAllOrderDetails(orderID);
                ctx.response.type = 'application/json';
                ctx.response.status = 200;
                ctx.response.body = resultOrderDetails;

            } catch (error) {
                ctx.response.status = 500;
                console.log(error);
            }
        }

    } catch (errorContext) {
        ctx.response.status = errorContext.response.status;
        ctx.response.body = errorContext.response.body;
    }
});


// router.get('/:orderID/order-details/:orderDetailID', (ctx) => {
//     const orderID = ctx.request.params?.orderID;
//     const orderDetailID = ctx.request.params?.orderDetailID;
//
//     console.log(orderID);
//     console.log(orderDetailID);
// });


const validationProcessOfOrderID = async (orderID, ctx) => {

    return new Promise(async (resolve, reject) => {
        /* validate input. */
        const validationResult = commonValidation.validateID(orderID);
        if (validationResult.length !== 0) {
            /* found errors. */
            ctx.response.status = 400;
            ctx.response.body = validationResult;
            reject(ctx);
        }

        try {
            ctx.response.type = 'application/json';
            const resultGetOrder = await getOrder(orderID);
            if (resultGetOrder) {
                ctx.response.status = 200;
                ctx.response.body = resultGetOrder;
                resolve(ctx);
            } else {
                /* no matching order found. */
                ctx.response.status = 404;
                reject(ctx);
            }
        } catch (error) {
            ctx.response.status = 500;
            console.log(error);
            reject(ctx);
        }
    });
}

module.exports = router;
