import React from 'react';
import {Button, Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default class Mobile extends React.Component {

    render() {
        return (
            <div className="container-sm">
                <br/>
                <h1>Mobile Service Details</h1>

                <br/>
                <br/>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="name" placeholder="Username"/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Mobile number</Form.Label>
                        <Form.Control type="name" placeholder="mobile number"/>
                    </Form.Group>


                    <br/>
                    <Button variant="primary">
                        {/* // TODO: if registration successful, then redirect to root URL (/product). */}
                        <Link to="/delivery" style={{textDecoration: 'none', color: 'white'}}>Confirm</Link>
                    </Button>
                </Form>
                <br/>
            </div>
        );
    }
}

