import React from "react";
import Products from "./Products";
import { Route, Switch, Redirect } from "react-router-dom";
import AddEditProduct from "./AddEditProduct";
import { ProductContext } from "../../context/product.context";
import sha256 from "crypto-js/sha256";

export default class ProductsHolder extends React.Component {
  static contextType = ProductContext;

  constructor(props) {
    super(props);
  }

  /** this method is also temporary method. this will be removed as soon as possible,
     when context API is implemented. */
  addNewProduct({ name, description, price, quantity }) {
    products.push({
      id: products.length + 1,
      name,
      description,
      price,
      quantity,
    });
  }

  /** temporary method to add a new product. */
  addProduct(product) {
    return this.context.addProduct(product);
  }

  /** temporary method to update the product. */
  updateProduct(product) {
    return this.context.updateProduct(product);
  }

  render() {
    // console.log('product holder works', this.context);
    const isAdmin =
      atob(
        sessionStorage.getItem(sha256(process.env.AUTHENTICATED_USER_TYPE))
      ) === "ADMIN";
    const { cartList } = this.props;

    return (
      <div>
        <Switch>
          <Route exact path="/products">
            {/* products component. */}
            <Products
              products={this.context?.products ? this.context?.products : []}
            />
          </Route>
          <Route
            exact
            path="/products/add"
            render={(props) => (
              <AddEditProduct {...props} saveOrUpdate={this.addProduct} />
            )}
          />
          <Route
            exact
            path="/products/:productID/edit"
            render={(props) => (
              <AddEditProduct {...props} saveOrUpdate={this.updateProduct} />
            )}
          />
          <Products
            products={this.context?.products ? this.context?.products : []}
          />
          {/* Protected routes - if User Type == 'ADMIN' then only client can navigate to these routes. */}
          <Route
            exact
            path="/products/add"
            render={(props) =>
              isAdmin ? (
                <AddEditProduct
                  {...props}
                  saveOrUpdate={this.addProduct.bind(this)}
                />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
            path="/products/:productID/edit"
            render={(props) =>
              isAdmin ? (
                <AddEditProduct
                  {...props}
                  saveOrUpdate={this.updateProduct.bind(this)}
                />
              ) : (
                <Redirect to="/" />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}
