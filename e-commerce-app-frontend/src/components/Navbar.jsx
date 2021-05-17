import React, {Component} from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import {Link, Route, Switch} from 'react-router-dom';
import Login from './login/Login';
import Register from './register/Register';


export default class ButtonAppBar extends Component {
    render() {
        return (
            <div>
                <ReactBootStrap.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <ReactBootStrap.Navbar.Brand>E-Commerce App</ReactBootStrap.Navbar.Brand>
                    <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                        <ReactBootStrap.Nav className="mr-auto">
                            <Link to="/" className="nav-link">Home</Link>
                        </ReactBootStrap.Nav>
                        <ReactBootStrap.Nav>
                            <Link to="/login" className="nav-link">Login</Link>
                        </ReactBootStrap.Nav>
                    </ReactBootStrap.Navbar.Collapse>
                </ReactBootStrap.Navbar>

                <Switch>
                    {/*<Route exact path="/">*/}
                    {/*    <ProductsHolder/>*/}
                    {/*</Route>*/}
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/register">
                        <Register/>
                    </Route>
                </Switch>
            </div>
        );
    }
}