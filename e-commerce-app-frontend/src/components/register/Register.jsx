import React from 'react';
import {Button, Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';


export default class Register extends React.Component {

    render() {
        return (
            <div className="container-sm">
                <br/>
                <h1>Register</h1>

                <br/>
                <br/>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="name" placeholder="Username"/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"/>
                    </Form.Group>

                    <Form.Group controlId="formGridState">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control as="select" defaultValue="Choose...">
                            <option>Male</option>
                            <option>Female</option>
                        </Form.Control>
                    </Form.Group>

                    <br/>
                    <Button variant="primary">
                        {/* // TODO: if registration successful, then redirect to root URL (/product). */}
                        <Link to="/" style={{textDecoration: 'none', color: 'white'}}>Register</Link>
                    </Button>
                </Form>
                <br/>

                <Link to="/login" style={{textDecoration: 'none', color: 'black'}}>Already have an account? Login</Link>
            </div>
        );
    }
}

