import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { cartList } from '../product/ProductListItem';

import CartHolder from '../cart/CartHolder';



/* This will be removed, soon.*/
const cartItems = [
    {
        id: 1,
        name: 'React',
        description: 'Best UI library',
        price: '100',
        quantity: '10',
    },
    {
        id: 2,
        name: 'Node',
        description: 'Server side JS',
        price: '100',
        quantity: '10',
    }
];



export default class Cart extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log("cart page displayed");
        return (
            
            <div>
           
                <Switch>
                    {/* product component */}
                    <Route path="/cart">
                        <CartHolder/>
                    </Route>
                </Switch>
            </div>
        );
    }
}

