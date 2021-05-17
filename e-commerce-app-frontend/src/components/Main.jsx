import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import ProductHolder from './product/ProductsHolder';

export default class Main extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
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

