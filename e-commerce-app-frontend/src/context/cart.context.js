/*
@author : Dhanusha Perera
@date : 23/05/2021
*/
import React, {Component} from 'react';

const CartContext = React.createContext({
    cartProducts: [],
    addToCart: () => {
    },
    removeFromCart: () => {
    },
    totalAmount: () => {
    },
    cleanCart: () => {
    }
});

class CartProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartProducts: [],
            addToCart: null,
            removeFromCart: null,
            totalAmount: 0,
            cleanCart: null
        };
    }

    _addToCart(product) {
        this.setState(prevState => {
            [...prevState.cartProducts].unshift(product);
        });

        this._totalAmount();
    }

    _removeFromCart(productId) {
        this.setState(prevState => {
            const productsArr = [...prevState.cartProducts];
            /* find the index of the updated product element/object. */
            const indexOfProduct = productsArr.findIndex((productElem, index) => productElem.id === product?.id);
            /* replace the updated product with the old one. */
            productsArr.splice(indexOfProduct, 1);

            this.setState((prevValue => {
                prevValue.products = productsArr;
            }));

            this._totalAmount();
        });
    }

    /* calculate the total. */
    _totalAmount() {
        let total = 0;
        if (this.state.cartProducts) {
            this.setState({
                totalAmount: 0
            });
        } else {
            this.state.cartProducts.forEach(productElem => {
                total += productElem.unitPrice;
            });

            this.setState({
                totalAmount: total
            });
        }
    }

    _cleanCart() {
        this.state.cartProducts = [];
    }

    render() {
        return (<CartContext.Provider value={
            {
                cartProducts: this.state.cartProducts,
                addToCart: this._addToCart.bind(this),
                removeFromCart: this._removeFromCart.bind(this),
                totalAmount: this.state.totalAmount,
                cleanCart: this._cleanCart.bind(this)
            }
        }>
            {this.props.children}
        </CartContext.Provider>);
    }
}

const CartConsumer = CartContext.Consumer;
module.exports = {
    CartProvider, CartContext, CartConsumer
};
