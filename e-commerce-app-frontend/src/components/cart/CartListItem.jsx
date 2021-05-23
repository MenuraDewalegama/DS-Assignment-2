
import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { Link, useHistory } from 'react-router-dom';
import { cartList, cartTotal } from '../product/ProductListItem';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const fontStyle = {
    fontSize: 'medium',
};

export var tot = cartTotal;

export default function CartListItem(props) {
    const { product, selectProduct } = props;
    let history = useHistory();

    /* remove  the product from the cart. */
    const onRemove = () => {
        const index = cartList.indexOf(product);
        cartList.splice(index, 1);
    };

    console.log(product);
    const notify = () =>
        toast.error('Item removed from the cart', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    return (
        <div style={{ marginRight: '5%' }}>
            <br />
            <Row>
                <Col>
                    <Card style={{ width: '20rem', height: '15rem' }}>
                        <Card.Body>
                            <Card.Title><b>{product.name}</b></Card.Title>
                            <Card.Text style={fontStyle}>
                                Description: {product.description}
                            </Card.Text>
                            <b><Card.Text style={{color:'green', fontSize:'25px', marginBlockEnd:'5%'}}>Unit Price: Rs{product.unitPrice}/=</Card.Text></b>

                            <Row>
                                {
                                    // product delete button
                                    (true) ? (
                                        <Link to="/" style={{ color: 'white', margin: 'auto' }}>
                                            <Button
                                                style={{ margin: 'auto', padding: '0.4rem 1rem' }}
                                                variant="danger"
                                                onClick={() => {
                                                    onRemove();
                                                    notify();
                                                }}
                                                title="Delete Product"
                                            >
                                                <Trash style={{ fontSize: '1.6rem' }} />
                                            </Button>
                                        </Link>
                                    ) : (
                                        ''
                                    )
                                }
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
