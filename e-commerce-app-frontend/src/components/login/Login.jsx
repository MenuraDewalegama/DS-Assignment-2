import React from 'react';
import {Button, Form} from 'react-bootstrap';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Register from '../register/Register';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            password: ''
        };
    }

    /* keep track of changes of the form field values. */
    onChange(event) {
        const {name, value} = event.target;
        console.log(event.target);
        this.setState({[name]: value});
        console.log(value);
    }

    render() {
        return (
            <div>
                <div className="container-sm">
                    <br/>
                    <h1>Login</h1>
                    <br/><br/>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>User ID</Form.Label>
                            <Form.Control name="userID" value={this.state.userID} type="text"
                                          onChange={(event) => this.onChange(event)}
                                          placeholder="User ID"/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" value={this.state.password} type="password"
                                          onChange={(event) => this.onChange(event)}
                                          placeholder="Password"/>
                        </Form.Group>
                        <br/>
                        <Button variant="primary">
                            <Link to="/" style={{textDecoration: 'none', color: 'white'}}>Login</Link>
                        </Button>
                    </Form>
                    <br/>
                    <Link to="/register"
                          style={{textDecoration: 'none', color: 'black'}}>Don't have an account? Register</Link>
                </div>

                {/* router */}
                <Router>
                    <Switch>
                        <Route path="/register" component={Register}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}
