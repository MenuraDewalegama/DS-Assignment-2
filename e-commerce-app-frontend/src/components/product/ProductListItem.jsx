import React from 'react';
import {Button, Card, Col, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';

/* TODO: this will be removed. */
export const cartList = [];

export default function ProductListItem(props) {

    const {product, selectProduct} = props;

    const onClickAddToCart = () => {
        cartList.push(product);
        console.log(cartList);
    };

    return (
        <div style={{marginRight: '5%'}}>
            <br/>
            <Row>
                <Col>
                    <Card style={{width: '18rem'}}>
                        <Card.Img variant="top" src="https://via.placeholder.com/300"/>
                        <Card.Body>
                            <Card.Title>Name: {product.name}</Card.Title>
                            <Card.Text>Description: {product.description}</Card.Text>
                            <Card.Text>Price: {product.price}</Card.Text>
                            <Card.Text>Qty: {product.quantity}</Card.Text>

                            <Row>

                                {   // product edit button
                                    (true) ? <Button style={{margin: 'auto'}} variant="primary"
                                                     onClick={() => selectProduct(product)}>Edit
                                        Item</Button> : ''}

                                <Link to="/cart" style={{color: 'white', margin: 'auto'}}>
                                    <Button variant="primary"
                                            onClick={() => {
                                                selectProduct(product);
                                                onClickAddToCart(product);
                                            }}
                                    >Add to cart
                                    </Button>
                                </Link>
                            </Row>
                        </Card.Body>
                    </Card>

                </Col>
            </Row>


        </div>

    );
}




