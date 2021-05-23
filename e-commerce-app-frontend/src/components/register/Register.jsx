import React from 'react';
import {Badge, Button, Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import UserService from '../../service/user.service';
import {UserContext} from '../../context/user.context';

export default class Register extends React.Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            contactNo: null,
            password: null,
            type: ''
        };
    }

    /** Register the user. */
    onSubmit() {
        console.log('register called!');
        console.log(this.state);
        const {password} = this.state;

        if (!this.state?.type) {
            console.log('Invalid type: Select');
            return;
        }
        UserService.addUser(this.state).then(async response => {
            if (response.status === 201) {
                /* 201- user created. */
                console.log('user created!', response.data);
                const resultObject = response?.data;
                try {
                    await this.context.authenticateUser({userID: resultObject?.generatedId, password: password});
                    // await UserService.authenticate(response.data?.generatedId, this.state?.password);
                    // sessionStorage.setItem(sha256(process.env.AUTHENTICATED_USER_NAME), this.user)
                    // window.location = '/';
                } catch (error) {
                    console.error(error);
                }
            }
        });
    }

    /* keep track of changes of the form field values. */
    onChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
        console.log(name, value);
    }

    render() {
        console.log(this.context);
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
                                      name="contactNo"
                                      placeholder="Contact No"
                                      onChange={(event) => this.onChange(event)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicUserType">
                        <Form.Label>User Type</Form.Label>
                        <Form.Control name="type" as="select"
                                      custom
                                      defaultValue='USER'
                                      onChange={(event) => this.onChange(event)}>
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </Form.Control>
                    </Form.Group>

                    <br/>
                    <Button disabled={(this.context?.currentUser?._id) ? true : false} variant="primary"
                            onClick={this.onSubmit.bind(this)}
                    >Register</Button>
                    <br/>
                    <br/>
                    <p>{
                        (this.context?.currentUser?._id) ?
                            <>
                                <p className="text-success font-weight-bold">Copy and save your Generated User ID
                                    : &nbsp; {`${this.context?.currentUser?._id}`}</p>
                                <Badge variant="secondary">{this.context?.currentUser?.id}</Badge>
                                <p>(Use this generated ID and your password as login credentials in the future.)</p>
                                <Link to="/">All done!, click here and enter to the site</Link>
                            </>
                            : ''}</p>
                </Form>
                <br/>

                <Link to="/login" style={{textDecoration: 'none', color: 'black'}}>Already have an account? Login</Link>
            </div>
        );
    }
}

