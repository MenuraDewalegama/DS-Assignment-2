import React, {Component} from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import {Link, Route, Switch} from 'react-router-dom';
import Login from './login/Login';
import Register from './register/Register';
import { Cart2 } from 'react-bootstrap-icons';
import { Person } from 'react-bootstrap-icons';
import { House } from 'react-bootstrap-icons';



export default class ButtonAppBar extends Component {
    render() {
        return (
            <div>
                <ReactBootStrap.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <ReactBootStrap.Navbar.Brand>E-Commerce App</ReactBootStrap.Navbar.Brand>
                    <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                        <ReactBootStrap.Nav className="mr-auto">
                            <Link to="/" className="nav-link"><ReactBootStrap.Badge variant="secondary"> <House color="white" size={40} /> </ReactBootStrap.Badge></Link>
                        </ReactBootStrap.Nav>
                        <ReactBootStrap.Nav>
                            <Link to="/login" className="nav-link"><ReactBootStrap.Badge variant="secondary"> <Cart2 color="white" size={40} /></ReactBootStrap.Badge></Link>
                            <Link to="/login" className="nav-link"><ReactBootStrap.Badge variant="secondary"> <Person color="white" size={40} /></ReactBootStrap.Badge> </Link>
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
