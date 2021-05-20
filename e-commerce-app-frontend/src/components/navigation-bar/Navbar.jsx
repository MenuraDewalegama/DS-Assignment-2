import React, {Component} from 'react';
import {Badge, Button, Nav, Navbar} from 'react-bootstrap';
import {Link, Route, Switch} from 'react-router-dom';

/* components. */
import Login from '../login/Login';
import Register from '../register/Register';
import Cart from '../cart/Cart';
import {Cart2, House} from 'react-bootstrap-icons';
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
                            (true) ?
                                <Nav>
                                    <h3 style={{color: 'white', margin: 'auto'}}>Hi User! </h3>
                                    <Link style={{margin: 'auto'}} to="/cart" className="nav-link">
                                        <Badge variant="secondary">
                                            <Cart2 color="white" size={40}/>
                                        </Badge>
                                    </Link>

                                    <Button variant="danger" style={{height: '30%', margin: 'auto'}}>
                                        <Link to="/login" className="nav-link"> Logout</Link>
                                    </Button>
                                </Nav>

                                //if user is not logged in

                                : <Nav>
                                    <Link to="/login" className="nav-link"> Login </Link>
                                    <Link to="/register" className="nav-link"> Register </Link>
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
