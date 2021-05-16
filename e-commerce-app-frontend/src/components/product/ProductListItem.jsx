import React from 'react';
import * as ReactBootStrap from 'react-bootstrap';


export default function ProductListItem(props) {
    const {product, selectProduct} = props;
    return (

        <div>
            <br/>
            <ReactBootStrap.Card style={{width: '18rem'}}>
                {/* <ReactBootStrap.Card.Img variant="top" src="holder.js/100px180" /> */}
                <ReactBootStrap.Card.Body>
                    <ReactBootStrap.Card.Title>{product.name}</ReactBootStrap.Card.Title>
                    <ReactBootStrap.Card.Text>{product.description}</ReactBootStrap.Card.Text>
                    <ReactBootStrap.Card.Text>{product.price}</ReactBootStrap.Card.Text>
                    <ReactBootStrap.Card.Text>{product.quantity}</ReactBootStrap.Card.Text>
                    <ReactBootStrap.Button variant="primary" onClick={() => selectProduct(product)}>Go
                        somewhere</ReactBootStrap.Button>
                </ReactBootStrap.Card.Body>
            </ReactBootStrap.Card>
        </div>

    );
}
