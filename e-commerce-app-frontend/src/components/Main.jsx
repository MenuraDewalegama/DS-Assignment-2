import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import ProductHolder from './product/ProductsHolder';

export default class Main extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                 {/* <h1>Products</h1> */}
                <Switch>
                    <Redirect exact from="/" to="/products"/>
                    {/* product component */}
                    <Route path="/products">
                        <ProductHolder/>
                   </Route>
                </Switch>
            
            </div>
        );
    }
}

