import React from 'react';
import * as ReactBootStrap from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Redirect, Link, NavLink } from 'react-router-dom'
import Login from './login'
import ProductsHolder from './product.components/productsHolder';
import Register from './register';


export default function ButtonAppBar() {


    return (

        <div>
            <ReactBootStrap.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <ReactBootStrap.Navbar.Brand >E-Commerce App</ReactBootStrap.Navbar.Brand>
                <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                    <ReactBootStrap.Nav className="mr-auto">
                        <Link to="/" className="nav-link">Home</Link>
                    </ReactBootStrap.Nav>
                    <ReactBootStrap.Nav>
                        <Link to="/login" className="nav-link" >Login</Link>
                    </ReactBootStrap.Nav>
                </ReactBootStrap.Navbar.Collapse>
            </ReactBootStrap.Navbar>

            <Switch>
                <Route exact path='/'>
                    <ProductsHolder />
                </Route>
                <Route path='/login'>
                    <Login />
                </Route>
                <Route path='/register'>
                    <Register />
                </Route>
            </Switch>
        </div>
    );
}