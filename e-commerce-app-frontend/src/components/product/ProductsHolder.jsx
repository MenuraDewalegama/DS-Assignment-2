import React from 'react';
import Products from './Products';
import {Route, Switch} from 'react-router-dom';
import AddEditProduct from './AddEditProduct';

/* this product list will be removed as soon as possible,
     when context API is implemented. */
const products = [
    {
        id: 1,
        name: 'React',
        description: 'Best UI library',
        price: '100',
        quantity: '10',
    },
    {
        id: 2,
        name: 'Node',
        description: 'Server side JS',
        price: '100',
        quantity: '10',
    }
];

export default class ProductsHolder extends React.Component {
    constructor(props) {
        super(props);

    }

    /** this method is also temporary method. this will be removed as soon as possible,
     when context API is implemented. */
    addNewProduct({name, description, price, quantity}) {
        products.push({id: products.length + 1, name, description, price, quantity});
    }

    /** temporary method to add a new product. */
    addProduct(product) {
        console.log('adding a new product -------------------------');
        console.log(product);
    }

    /** temporary method to update the product. */
    updateProduct(product) {
        console.log('updating product -------------------------');
        console.log(product);
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/products">
                        {/* products component. */}
                        <Products products={products}/>
                    </Route>
                    <Route exact path="/products/add"
                           render={(props) => <AddEditProduct {...props} saveOrUpdate={this.addProduct}/>}/>
                    <Route exact path="/products/:productID/edit"
                           render={(props) => <AddEditProduct {...props} saveOrUpdate={this.updateProduct}/>}/>
                </Switch>
            </div>
        );
    }
}
