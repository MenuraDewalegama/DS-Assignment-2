import React from 'react';
import {Button, Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';


export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            contactNo: null,
            password: null,
            type: null
        };
    }

    /** Register the user. */
    onSubmit() {
        console.log('register called!');
        console.log(this.state);
    }

    /* keep track of changes of the form field values. */
    onChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
        console.log(name, value);
    }

    render() {
        return (
            <div className="container-sm">
                <br/>
                <h1>Register</h1>

                <br/>
                <br/>
                <Form>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name"
                                      type="name"
                                      placeholder="Name"
                                      onChange={(event) => this.onChange(event)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password"
                                      type="password"
                                      placeholder="Password"
                                      onChange={(event) => this.onChange(event)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicContactNo">
                        <Form.Label>Content No</Form.Label>
                        <Form.Control type="name"
                                      placeholder="Contact No"
                                      onChange={(event) => this.onChange(event)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicDelivery">
                        <Form.Label>User Type</Form.Label>
                        <Form.Control name="type" as="select" defaultValue="DHL"
                                      onChange={(event) => this.onChange(event)}>
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </Form.Control>
                    </Form.Group>

                    <br/>
                    <Button variant="primary"
                            onClick={this.onSubmit.bind(this)}
                    >Register</Button>
                </Form>
                <br/>

                <Link to="/login" style={{textDecoration: 'none', color: 'black'}}>Already have an account? Login</Link>
            </div>
        );
    }
}

