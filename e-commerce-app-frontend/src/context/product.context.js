/*
@author : Dhanusha Perera
@date : 20/05/2021
*/
import React, {Component} from 'react';
import ProductService from '../service/product.service';

/* create product context with default values. */
const ProductContext = React.createContext({
    products: [],
    getAllProducts: () => {
    },
    getProductByID: () => {
    },
    addProduct: (product) => {
    },
    updateProduct: (product) => {
    },
    deleteProduct: (productID) => {
    },
});

class ProductProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    /** Get all the products by calling backend.
     * @return Promise with a result. If success, then resolve the product.
     * otherwise, reject the error(errorRespond) */
    getAllProducts() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await ProductService.getAllProducts();
                if (response.status === 200) {
                    this.setState({
                        products: JSON.parse(response.data)
                    });
                    resolve(this.state.products);
                }
            } catch (error) {
                reject(error);
            }
        });
    }


    /** Get the product by its productID.
     * @param  productID id of the product.
     * @return Promise with a result. If success, then resolve the product.
     * otherwise, reject the error(errorRespond) */
    getProductByID(productID) {
        return new Promise(async (resolve, reject) => {

            const requestedProduct = this.state.products.filter(value => value.id === productID);
            if (requestedProduct) {
                resolve(requestedProduct);
            } else {
                try {
                    const response = await ProductService.getProductByID(productID);
                    /* if matching record found. then resolve it. */
                    if (response.status === 200) {
                        /* 200 - OK. */
                        const retrievedProduct = JSON.parse(response.data);
                        this.setState(((prevState) => prevState.products.unshift(retrievedProduct)));
                        resolve(retrievedProduct);
                    }
                } catch (error) {
                    reject(error);
                }
            }
        });
    }

    render() {
        return (
            <ProductContext.Provider value={{
                products: this.state.products,
                getAllProducts: this.getAllProducts(),
                getProductByID: this.getProductByID,
                addProduct: this.addProduct(),
                updateProduct: this.updateProduct(),
                deleteProduct: this.deleteProduct(),
            }
            }>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}
