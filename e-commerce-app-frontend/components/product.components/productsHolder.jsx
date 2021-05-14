import React from 'react'
import Products from './products'
import * as ReactBootStrap from 'react-bootstrap'

import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom'
import AddProduct from './addProduct';

const products = [
    {
        id: 1,
        name: "React",
        description: "Best UI library",
        price: "100",
        quantity: "10",
    },
    {
        id: 2,
        name: "Node",
        description: "Server side JS",
        price: "100",
        quantity: "10",
    }
];

export default class ProductsHolder extends React.Component {
    constructor(props) {
        super(props)
    }

    addNewProduct({ name, description, price, quantity }) {
        products.push({ id: products.length + 1, name, description, price, quantity })
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/'>
                        <Products products={products} />
                    </Route>
                    <Route exact path='/user'>
                        <div className="container-sm" style={{ marginTop: "50px" }}>
                            <ReactBootStrap.Button variant="primary">
                                <Link to='/user/add-product' style={{ textDecoration: 'none', color: "white" }}>Add</Link>
                            </ReactBootStrap.Button>
                        </div>
                        <Products products={products} />

                    </Route>
                    <Route path='/user/add-product'>
                        <AddProduct save={product => this.addNewProduct(product)} />
                    </Route>
                </Switch>

            </div>
        );
    }
}