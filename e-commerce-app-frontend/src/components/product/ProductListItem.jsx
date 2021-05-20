import React from 'react';
import {Button, Card, Col, Row} from 'react-bootstrap';
/*icons*/
import {CartPlus, PencilSquare} from 'react-bootstrap-icons';
import {Link, useHistory} from 'react-router-dom';

/* TODO: this will be removed. */
export const cartList = [];

const fontStyle = {
    fontSize: 'medium'
};

export default function ProductListItem(props) {

    const {product, selectProduct} = props;
    let history = useHistory();
    const onClickAddToCart = () => {
        cartList.push(product);
        console.log(cartList);
    };

    const redirectToEdit = () => {
        history.push(`/products/${product.id}/edit`);
    };


    return (
        <div style={{marginRight: '5%'}}>
            <br/>
            <Row>
                <Col>
                    <Card style={{width: '20rem'}}>
                        <Card.Img variant="top" src="https://via.placeholder.com/300"/>
                        <Card.Body>
                            <Card.Title>Name: {product.name}</Card.Title>
                            <Card.Text style={fontStyle}>Description: {product.description}</Card.Text>
                            <Card.Text>Unit Price: {product.price}</Card.Text>
                            <Card.Text>Hand On Quantity: {product.quantity}</Card.Text>

                            <Row>

                                {   // product edit button
                                    (true) ? <Button style={{margin: 'auto', padding: '0.4rem 1rem'}} variant="primary"
                                                     onClick={() => {
                                                         selectProduct(product);
                                                         redirectToEdit();
                                                     }} title="Edit Product">
                                        <PencilSquare style={{fontSize: '1.6rem'}}/>
                                    </Button> : ''}

                                <Link to="/cart" style={{color: 'white', margin: 'auto'}}>
                                    <Button style={{margin: 'auto', padding: '0.4rem 1rem'}} variant="primary"
                                            onClick={() => {
                                                selectProduct(product);
                                                onClickAddToCart(product);
                                            }} title="Add to Cart"><CartPlus style={{fontSize: '1.6rem'}}/>
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




