import React from 'react';
import Products from './Products';
import {Route, Switch} from 'react-router-dom';
import AddEditProduct from './AddEditProduct';
import {ProductContext} from '../../context/product.context';
import sha256 from 'crypto-js/sha256';

export default class ProductsHolder extends React.Component {

    static contextType = ProductContext;

    constructor(props) {
        super(props);
    }

    /** temporary method to add a new product. */
    addProduct(product) {
        console.log('adding a new product -------------------------');
        console.log(product);
        this.context.addProduct(product);
    }

    /** temporary method to update the product. */
    updateProduct(product) {
        console.log('updating product -------------------------');
        console.log(product);
        this.context.updateProduct(product);
    }

    render() {
        console.log('product holder works', this.context);
        return (
            <div>
                <Switch>
                    <Route exact path="/products">
                        {/* products component. */}
                        <Products products={(this.context?.products) ? this.context?.products : []}/>
                    </Route>
                    {(atob(sessionStorage.getItem(sha256(process.env.AUTHENTICATED_USER_TYPE))) === 'ADMIN') ?
                        <><Route exact path="/products/add"
                                 render={(props) => <AddEditProduct {...props} saveOrUpdate={this.addProduct}/>}/>
                            <Route exact path="/products/:productID/edit"
                                   render={(props) => <AddEditProduct {...props} saveOrUpdate={this.updateProduct}/>}/>
                        </>
                        : ''
                    }
                </Switch>
            </div>
        );
    }
}
