import React from 'react';
import ProductListItem from './ProductListItem';
import {Button, Col, Container, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import sha256 from 'crypto-js/sha256';

export default class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null
        };
    }

    selectProduct(product) {
        this.setState({product: product});
    }

    render() {
        const {products} = this.props;
        const isAdmin = (atob(sessionStorage.getItem(sha256(process.env.AUTHENTICATED_USER_TYPE))) === 'ADMIN');
        return (
            <Container style={{padding: '2rem 0'}}>
                {/* header. */}

                <Container fluid className="products-header p-0">
                    <Row>
                        <Col>
                           <h1>Products</h1>
                        </Col>
                        <Col style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            justifyItems: 'center'
                        }}>
                            {(isAdmin) ? <Link to="/products/add">< Button> Add </Button></Link> : ""}
                        </Col>
                    </Row>
                </Container>

                <Container fluid>
                    <Row>
                        {/* display product item by item by looping through. */}
                        {products.map(product => {
                            return <ProductListItem
                                key={product._id} product={product}
                                selectProduct={product => {
                                    this.selectProduct(product);
                                }}/>;
                        })}
                    </Row>
                </Container>

            </Container>
        );
    }
}
