import React from 'react';

export default class Product extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { product } = this.props;
        return (
            <div>
                <div>
                    <p>ID: {product.id}</p>
                </div>
                <div>
                    <p>Name: {product.name}</p>
                </div>
                <div>
                    <p>Description: {product.description}</p>
                </div>
                <div>
                    <p>Price: {product.price}</p>
                </div>
                <div>
                    <p>Quanity: {product.quantity}</p>
                </div>
            </div>
        );
    }
}