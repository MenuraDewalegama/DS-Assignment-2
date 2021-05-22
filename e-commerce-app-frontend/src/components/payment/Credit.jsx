import React from 'react';
import {Button, Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';


export default class Credit extends React.Component {

    render() {
        return (
            <div className="container-sm">
                <br/>
                <h1>Credit Card Details</h1>

                <br/>
                <br/>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="name" placeholder="Username"/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>card number</Form.Label>
                        <Form.Control type="name" placeholder="address"/>
                    </Form.Group>

                    <Form.Group controlId="Contact number">
                        <Form.Label>CVC number</Form.Label>
                        <Form.Control type="name" placeholder="contact number"/>
                    </Form.Group>


                    <Form.Group controlId="Contact number">
                        <Form.Label>Expirey Date</Form.Label>
                        <Form.Control type="name" placeholder="email"/>
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

