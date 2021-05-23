/*
@author : Dhanusha Perera
@date : 20/05/2021
*/
import React, {Component} from 'react';
import ProductService from '../service/product.service';
import sha256 from 'crypto-js/sha256';
import axios from '../service/axios.service';

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

    async componentDidMount() {
        const jwtToken = sessionStorage.getItem(sha256(process.env.JWT_TOKEN_NAME));
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        try {
            await this.getAllProducts();
        } catch (error) {
            console.error(error);
        }
    }

    /** Search prodcut by product name. */
    filterProductsByName(searchValue) {
        console.log('search Value: ', searchValue);
        return new Promise(async (resolve, reject) => {
            if (!searchValue || this.state.products.length === 0) {
                try {
                    await this.getAllProducts();
                } catch (error) {
                    reject(error);
                }
            } else {
                const resultProductList = [...this.state.products]
                    .filter(option => option.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0);
                console.log('result', resultProductList);
                this.setState({
                    products: resultProductList
                });
                resolve(true);
            }
        });
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
                        products: response.data
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

            const requestedProduct = this.state.products.find(productElem => (productElem?._id === productID));
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

    /** Add a new product. */
    addProduct(product) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await ProductService.saveProduct(product);
                if (response.status === 201) {
                    /* 201 -  created. */
                    const responseResultObject = response.data;
                    const newProductList = [...this.state.products];
                    newProductList.unshift({
                        ...product,
                        _id: responseResultObject?.generatedId
                    });

                    this.setState({
                        products: newProductList
                    });

                    const addedProduct = this.state
                        .products.find(productElem => productElem._id === responseResultObject?.generatedId);
                    if (addedProduct) {
                        resolve(addedProduct);
                    } else {
                        reject(new Error('Product was not inserted successfully!'));
                    }
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    /** Update a existing product by calling backend services.
     * @param product product object with the ID and new values.
     * @returns Promise promise a result. if success, resolve boolean true,
     * otherwise reject the error(errorResponse). */
    updateProduct(product) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await ProductService.updateProduct(product);
                if (response.status === 204) {
                    /* 204 -  NO CONTENT, updated successfully. */
                    /* get the products array. */
                    const productsArr = [...this.state.products];
                    /* find the index of the updated product element/object. */
                    const indexOfProduct = productsArr
                        .findIndex((productElem, index) => productElem.id === product.id);
                    /* replace the updated product with the old one. */
                    productsArr.splice(indexOfProduct, 1, product);

                    this.setState((prevValue => {
                        prevValue.products = productsArr;
                    }));
                    resolve(true);
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    /** Delete a product by ProductID by using backend services.
     * @param productID ID of the product to be deleted.
     * @return Promise promise with a result. */
    deleteProduct(productID) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await ProductService.deleteProduct(productID);
                if (response.status === 204) {
                    /* 204 - NO CONTENT - Deletion successful. */
                    /* get the products array. */
                    const productsArr = [...this.state.products];
                    /* find the index of the updated product element/object. */
                    const indexOfProduct = productsArr.findIndex((productElem, index) => productElem.id === product.id);
                    /* replace the updated product with the old one. */
                    productsArr.splice(indexOfProduct, 1);

                    this.setState((prevValue => {
                        prevValue.products = productsArr;
                    }));
                    resolve(true);
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    render() {
        return (
            <ProductContext.Provider value={{
                products: this.state.products,
                getAllProducts: this.getAllProducts.bind(this),
                getProductByID: this.getProductByID.bind(this),
                addProduct: this.addProduct.bind(this),
                updateProduct: this.updateProduct.bind(this),
                deleteProduct: this.deleteProduct.bind(this),
                filterProductsByName: this.filterProductsByName.bind(this)
            }
            }>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;
module.exports = {
    ProductContext, ProductProvider, ProductConsumer
};
