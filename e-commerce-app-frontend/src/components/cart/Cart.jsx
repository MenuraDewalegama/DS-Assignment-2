import React from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

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
        return (
            <div>
                <h1>This is the cart page</h1>
                <Button variant="primary">
                    <Link to="/delivery" style={{textDecoration: 'none', color: 'white'}}>Confirm Cart</Link>
                </Button>

            </div>
        );
    }
}

