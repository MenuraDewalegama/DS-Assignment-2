import React from 'react';
import {Route, Switch} from 'react-router-dom';
import CartHolder from '../cart/CartHolder';

export default class Cart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
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
