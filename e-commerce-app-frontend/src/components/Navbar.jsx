import React, {Component} from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import {Link, Route, Switch} from 'react-router-dom';
import Login from './login/Login';
import Register from './register/Register';
import Cart from './/cart/Cart';

import { Cart2 } from 'react-bootstrap-icons';
import { Person } from 'react-bootstrap-icons';
import { House } from 'react-bootstrap-icons';
import Delivery from './delivery/Delivery';
import Credit from './payment/Credit';
import Mobile from './payment/Mobile';



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
                <ReactBootStrap.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <ReactBootStrap.Navbar.Brand>E-Commerce App</ReactBootStrap.Navbar.Brand>
                    <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                        <ReactBootStrap.Nav className="mr-auto">
                            <Link to="/" className="nav-link"><ReactBootStrap.Badge variant="secondary"> <House color="white" size={40} /> </ReactBootStrap.Badge></Link>
                        </ReactBootStrap.Nav>
                      
                       
 

                       
                            {     //if user loged in
                            (true) ?  
                            <ReactBootStrap.Nav>
                             <h3 style={{color:'white', margin:'auto'}}  >Hi User!  </h3>
                            <Link style={{ margin:'auto'}} to="/cart" className="nav-link"><ReactBootStrap.Badge variant="secondary"> <Cart2 color="white" size={40} /></ReactBootStrap.Badge></Link>
                            {/* <Link to="/login" className="nav-link" style={{color:'white', margin:'auto'}}> Logut </Link> */}
                            <ReactBootStrap.Button variant="danger"style={{ height:'30%', margin:'auto'}} ><Link  to="/login" className="nav-link" > Logout</Link></ReactBootStrap.Button>
                            </ReactBootStrap.Nav>

                           //if user not logged in
                           
                           :  <ReactBootStrap.Nav>  
                           <Link to="/login" className="nav-link"> Login  </Link>

                           <Link to="/register" className="nav-link"> Register  </Link>

                        </ReactBootStrap.Nav>}

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
