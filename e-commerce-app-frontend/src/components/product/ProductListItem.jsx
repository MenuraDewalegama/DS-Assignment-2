import React from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import { Link, Route, Switch } from 'react-router-dom';

export const cartList = [];

export default function ProductListItem(props) {


    const { product, selectProduct } = props;



    const clickOnAddtoCart = () => {
        cartList.push(product);
        console.log(cartList);
    }


    return (

        <div style={{ marginRight: '5%' }}>
            <br />
            <ReactBootStrap.Row>
                <ReactBootStrap.Col >

                    <ReactBootStrap.Card style={{ width: '18rem' }}>
                        <ReactBootStrap.Card.Img variant="top" src="https://via.placeholder.com/300" />
                        <ReactBootStrap.Card.Body>
                            <ReactBootStrap.Card.Title>Name: {product.name}</ReactBootStrap.Card.Title>
                            <ReactBootStrap.Card.Text>Description: {product.description}</ReactBootStrap.Card.Text>
                            <ReactBootStrap.Card.Text>Price: {product.price}</ReactBootStrap.Card.Text>
                            <ReactBootStrap.Card.Text>Qty: {product.quantity}</ReactBootStrap.Card.Text>

                            <ReactBootStrap.Row >


                                {(true) ? <ReactBootStrap.Button style={{ margin: 'auto' }} variant="primary" onClick={() => selectProduct(product)}>Edit Item</ReactBootStrap.Button> : <div></div>}



                                <ReactBootStrap.Button id='btn' style={{ margin: 'auto' }} variant="primary" onClick={() => {
                                    selectProduct(product)
                                    clickOnAddtoCart(product)
                                }}><Link to="/cart" style={{ color: 'white' }}>Add to cart</Link></ReactBootStrap.Button>
                            </ReactBootStrap.Row>

                        </ReactBootStrap.Card.Body>
                    </ReactBootStrap.Card>

                </ReactBootStrap.Col>
            </ReactBootStrap.Row>


        </div>

    );
}




