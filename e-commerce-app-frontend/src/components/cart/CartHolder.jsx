import React from "react";
import { Route, Switch } from "react-router-dom";
import { cartList } from "../product/ProductListItem";
import Carts from "./Carts";

export default class CartHolder extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/cart">
            <Carts products={cartList} />
          </Route>
        </Switch>
      </div>
    );
  }
}
