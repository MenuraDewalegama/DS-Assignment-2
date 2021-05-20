import React from 'react';
import Product from './Product';
import ProductListItem, { cartList } from './ProductListItem';
import { Button, Row, Col, Container } from 'react-bootstrap';



export default class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null
        };
    }

    selectProduct(product) {
        this.setState({ product: product });
     
    }

    render() {
        const { products } = this.props;
        return (
            <div  style={{ marginLeft: '13%', marginTop:'20px' }}>
                {/* header. */}
                <section className="products-header">
                    <h1>Products</h1>
                </section>

                <Container fluid>
                    <Row >
                        {/* display product item by item by looping through. */}
                        {products.map(product => {
                            return <ProductListItem
                                key={product.id.toString()} product={product}
                                selectProduct={product => {
                                    this.selectProduct(product)
                                    console.log(product);
                                }} />;
                        })}
                        <div>
                            {this.state.product ? <Product product={this.state.product} /> : ''}
                        </div>
                    </Row>
                </Container>



            </div>
        );
    }
}
