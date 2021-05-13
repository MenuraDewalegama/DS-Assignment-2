import React from 'react'
import * as ReactBootStrap from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom'


export default class Login extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="container-sm">
                <br />
                <h1>Login</h1>

                <br />
                <br />
                <ReactBootStrap.Form>
                    <ReactBootStrap.Form.Group controlId="formBasicEmail">
                        <ReactBootStrap.Form.Label>Username</ReactBootStrap.Form.Label>
                        <ReactBootStrap.Form.Control type="name" placeholder="Username" />
                    </ReactBootStrap.Form.Group>

                    <ReactBootStrap.Form.Group controlId="formBasicPassword">
                        <ReactBootStrap.Form.Label>Password</ReactBootStrap.Form.Label>
                        <ReactBootStrap.Form.Control type="password" placeholder="Password" />
                    </ReactBootStrap.Form.Group>
                    <br />
                    <ReactBootStrap.Button variant="primary">
                        <Link to="/user" style={{ textDecoration: 'none' , color:"white"}}>Login</Link>
                    </ReactBootStrap.Button>
                </ReactBootStrap.Form>
                <br />

                <Link to="/register" style={{ textDecoration: 'none' , color:"black"}}>Don't have an account? Register</Link>
            </div>
        );
    }

}