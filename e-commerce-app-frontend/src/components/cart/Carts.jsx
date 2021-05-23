import React from 'react';
import {cartList} from '../product/ProductListItem';
import {Button, Col, Container, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import CartListItem from './CartListItem';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Carts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
        };
    }

    selectProduct(product) {
        this.setState({product: product});
    }

    render() {
        const {products} = this.props;

        const removeAll = () => {
            cartList.splice(0, cartList.length);
        };
        
        const notify = () =>
            toast.error('All the items Removed from Cart', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        return (
            <Container style={{padding: '2rem 0'}}>
                {/* header. */}

                <Container fluid className="products-header p-0">
                    <Row>
                        <Col>
                            <h1>Cart</h1>
                        </Col>
                        <Col
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                justifyItems: 'center',
                            }}
                        >
                            {cartList.length > 0 ? (
                                <Link to="/">
                                    {' '}
                                    <Button
                                        style={{backgroundColor: 'red'}}
                                        onClick={() => {
                                            removeAll();
                                            notify();
                                        }}
                                    >
                                        {' '}
                                        Remove all{' '}
                                    </Button>
                                </Link>
                            ) : (
                                ''
                            )}
                            {cartList.length > 0 ? (
                                <Link to="/delivery" style={{marginLeft: '5%'}}>
                                    {' '}
                                    <Button onClick={() => {
                                    }}> Proceed to payment </Button>
                                </Link>
                            ) : (
                                ''
                            )}
                        </Col>
                    </Row>
                </Container>

                <Container fluid>
                    <Row>
                        {/* display product item by item by looping through. */}
                        {products.map((product) => {
                            return (
                                <CartListItem
                                    key={product._id}
                                    product={product}
                                    selectProduct={(product) => {
                                        this.selectProduct(product);
                                    }}
                                />
                            );
                        })}
                    </Row>
                </Container>
            </Container>
        );
    }
}
