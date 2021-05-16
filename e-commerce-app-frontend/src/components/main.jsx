import React from 'React'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom'
import ProductHolder from './product.components/productsHolder';

export default class Main extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div >
                <Switch>
                    <Route path='/user'>
                        <ProductHolder />
                    </Route>
                </Switch>
            </div>
        );
    }
}

