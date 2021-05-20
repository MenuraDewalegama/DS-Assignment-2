import React from 'react';
import {Button, Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';


export default class Delivery extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            paymentType: '/credit'
        };
    };

    onChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    render() {
        return (
            <div className="container-sm">
                <br/>
                <h1>Delivery Details</h1>
                <br/><br/>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" placeholder="Name"/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="name" placeholder="address"/>
                    </Form.Group>

                    <Form.Group controlId="Contact number">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="name" placeholder="contact number"/>
                    </Form.Group>


                    <Form.Group controlId="Contact number">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="name" placeholder="email"/>
                    </Form.Group>

                    <Form.Group controlId="formGridState">
                        <Form.Label>Payment Type</Form.Label>
                        <Form.Control name="paymentType" as="select" onChange={event => this.onChange(event)}
                                      value={this.state.value}>
                            <option value="/credit">Credit</option>
                            <option value="/mobile">Mobile</option>
                        </Form.Control>
                    </Form.Group>

                    <br/>
                    <Button variant="primary">
                        <Link to={this.state.paymentType} style={{textDecoration: 'none', color: 'white'}}>Go
                            next</Link>
                    </Button>
                </Form>
                <br/>
            </div>
        );
    }
}

