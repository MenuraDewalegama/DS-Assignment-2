/*
@author : Dhanusha Perera
@date : 20/05/2021
*/

import React, {Component} from 'react';
import OrderService from '../service/order.service';

/* create the Order context using default values. */
const OrderContext = React.createContext({
    orders: [],
    addOrder: () => {
    }
});

class OrderProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };
    }

    /** Add a new order.
     * @param order order object with values.
     * @return Promise with a result. if success resolve { generatedId: <id>},
     * otherwise, reject the error. */
    addOrder(order) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await OrderService.addOrder(order);
                if (response.status === 201) {
                    /* 201 - CREATED - Order successful. */
                    const resultObject = JSON.parse(response.data);
                    /* created product should be add to the order array. */
                    this.setState(prevState => {
                        prevState.orders = [...prevState.orders].unshift({...order, id: resultObject?.generatedId});
                    });
                    resolve(resultObject);
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    render() {
        return (
            <OrderContext.Provider value={{
                orders: this.state.orders,
                addOrder: this.addOrder
            }}>
                {this.props.children}
            </OrderContext.Provider>
        );
    }
}

module.exports = {
    OrderContext, OrderProvider
};
