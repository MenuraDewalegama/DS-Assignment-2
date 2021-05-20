import React, {Component} from 'react';
import {Badge, Button, Nav, Navbar} from 'react-bootstrap';
import {Link, Route, Switch} from 'react-router-dom';
import {Cart2, House} from 'react-bootstrap-icons';
import './Nabar.css';

/* components. */
import Login from '../login/Login';
import Register from '../register/Register';
import Cart from '../cart/Cart';
import Delivery from '../delivery/Delivery';
import Credit from '../payment/Credit';
import Mobile from '../payment/Mobile';

export default class ButtonAppBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userStatus: true
        };
    };

    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand>E-Commerce App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to="/" className="nav-link">
                                <Badge variant="secondary">
                                    <House color="white" size={40}/>
                                </Badge>
                            </Link>
                        </Nav>

                        {     // if user logged in
                            (false) ?
                                <Nav>
                                    <h5 className="user_name">Hi User!</h5>
                                    <Link style={{margin: 'auto'}} to="/cart" className="nav-link">
                                        <Cart2 className="navbar_icon"/>
                                    </Link>


                                    <Link to="/login" className="nav-link">
                                        <Button variant="danger">Logout</Button>
                                    </Link>

                                </Nav>

                                //if user is not logged in

                                : <Nav>
                                    <Link to="/login" className="nav-link navigation_property">Login</Link>
                                    <Link to="/register" className="nav-link navigation_property">Register</Link>
                                </Nav>
                        }

                    </Navbar.Collapse>
                </Navbar>

                <Switch>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/register">
                        <Register/>
                    </Route>
                    <Route path="/cart">
                        <Cart/>
                    </Route>
                    <Route path="/delivery">
                        <Delivery/>
                    </Route>
                    <Route path="/mobile">
                        <Mobile/>
                    </Route>
                    <Route path="/credit">
                        <Credit/>
                    </Route>
                </Switch>
            </div>
        );
    }
}
