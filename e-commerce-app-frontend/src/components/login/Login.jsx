import React from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import User from '../User';
import Register from '../register/Register';


export default class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="container-sm">
                    <br/>
                    <h1>Login</h1>

                    <br/>
                    <br/>
                    <ReactBootStrap.Form>
                        <ReactBootStrap.Form.Group controlId="formBasicEmail">
                            <ReactBootStrap.Form.Label>Username</ReactBootStrap.Form.Label>
                            <ReactBootStrap.Form.Control type="name" placeholder="Username"/>
                        </ReactBootStrap.Form.Group>

                        <ReactBootStrap.Form.Group controlId="formBasicPassword">
                            <ReactBootStrap.Form.Label>Password</ReactBootStrap.Form.Label>
                            <ReactBootStrap.Form.Control type="password" placeholder="Password"/>
                        </ReactBootStrap.Form.Group>
                        <br/>
                        <ReactBootStrap.Button variant="primary">
                            <Link to="/" style={{textDecoration: 'none', color: 'white'}}>Login</Link>
                        </ReactBootStrap.Button>
                    </ReactBootStrap.Form>
                    <br/>
                    <Link to="/register" style={{textDecoration: 'none', color: 'black'}}>Don't have an account?
                        Register</Link>

                </div>


                <Router>
                    <Switch>
                        {/*<Route exact path="/user"/>*/}
                        <Route path="/register" component={Register}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}