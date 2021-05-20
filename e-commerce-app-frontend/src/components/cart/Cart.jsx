import React from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Register from '../register/Register';


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
        return (
            <div>
                <h1>This is the cart page</h1>
                <ReactBootStrap.Button variant="primary">
                    <Link to="/delivery" style={{ textDecoration: 'none', color: 'white' }}>Confirm Cart</Link>
                </ReactBootStrap.Button>
                
            </div>
        );


    }



}

