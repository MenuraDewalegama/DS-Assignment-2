import React from 'react';
import {Route, Switch} from 'react-router-dom';
import ProductHolder from './product/productsHolder';

export default class Main extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/user">
                        <ProductHolder/>
                    </Route>
                </Switch>
            </div>
        );
    }
}

