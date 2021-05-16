import React from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import {Link} from 'react-router-dom';


export default class Register extends React.Component {

    render() {
        return (
            <div className="container-sm">
                <br/>
                <h1>Register</h1>

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

                    <ReactBootStrap.Form.Group controlId="formGridState">
                        <ReactBootStrap.Form.Label>Gender</ReactBootStrap.Form.Label>
                        <ReactBootStrap.Form.Control as="select" defaultValue="Choose...">
                            <option>Male</option>
                            <option>Female</option>
                        </ReactBootStrap.Form.Control>
                    </ReactBootStrap.Form.Group>

                    <br/>
                    <ReactBootStrap.Button variant="primary">
                        <Link to="/user" style={{textDecoration: 'none', color: 'white'}}>Register</Link>
                    </ReactBootStrap.Button>
                </ReactBootStrap.Form>
                <br/>

                <Link to="/login" style={{textDecoration: 'none', color: 'black'}}>Already have an account? Login</Link>
            </div>
        );
    }
}

