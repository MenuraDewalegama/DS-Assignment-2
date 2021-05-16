import React from 'react';
import Product from './Product';
import ProductListItem from './ProductListItem';


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
        return (
            <div className="container-sm" style={{marginTop: '20px'}}>
                {products.map(product => {
                    return <ProductListItem
                        key={product.id.toString()} product={product}
                        selectProduct={product => this.selectProduct(product)}/>;
                })}
                <div>
                    {this.state.product ? <Product product={this.state.product}/> : ''}
                </div>
            </div>
        );
    }
}
