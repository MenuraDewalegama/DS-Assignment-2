import React from 'react';
import Products from '../product/Products';
import { Route, Switch } from 'react-router-dom';
import AddEditProduct from '../product/AddEditProduct';
import { cartList } from '../product/ProductListItem';
import Carts from './Carts';

/* this product list will be removed as soon as possible,
     when context API is implemented. */

export default class CartHolder extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {

        console.log(cartList)

        return (
            <div>
                <Switch>
                    <Route exact path="/cart">
                        <Carts products={cartList} />
                    </Route>
                </Switch>
            </div>
        );
    }
}
