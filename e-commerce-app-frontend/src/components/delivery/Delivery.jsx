import React from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import { Link } from 'react-router-dom';




export default class Delivery extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            paymentType: '/credit'
        };
    };

    

    onChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }


render() {
    return (
        <div className="container-sm">
            <br />
            <h1>Delivery Details</h1>

            <br />
            <br />
            <ReactBootStrap.Form>
                <ReactBootStrap.Form.Group controlId="formBasicEmail">
                    <ReactBootStrap.Form.Label>Name</ReactBootStrap.Form.Label>
                    <ReactBootStrap.Form.Control type="name" placeholder="Name" />
                </ReactBootStrap.Form.Group>

                <ReactBootStrap.Form.Group controlId="formBasicPassword">
                    <ReactBootStrap.Form.Label>Address</ReactBootStrap.Form.Label>
                    <ReactBootStrap.Form.Control type="name" placeholder="address" />
                </ReactBootStrap.Form.Group>

                <ReactBootStrap.Form.Group controlId="Contact number">
                    <ReactBootStrap.Form.Label>Address</ReactBootStrap.Form.Label>
                    <ReactBootStrap.Form.Control type="name" placeholder="contact number" />
                </ReactBootStrap.Form.Group>


                <ReactBootStrap.Form.Group controlId="Contact number">
                    <ReactBootStrap.Form.Label>Email</ReactBootStrap.Form.Label>
                    <ReactBootStrap.Form.Control type="name" placeholder="email" />
                </ReactBootStrap.Form.Group>

                <ReactBootStrap.Form.Group controlId="formGridState">
                    <ReactBootStrap.Form.Label>Payment Type</ReactBootStrap.Form.Label>
                    <ReactBootStrap.Form.Control name="paymentType" as="select" onChange={event => this.onChange(event)} value={this.state.value} >
                        <option value="/credit" >Credit</option>
                        <option value="/mobile">Mobile </option>
                    </ReactBootStrap.Form.Control>
                </ReactBootStrap.Form.Group>


                <br />
                <ReactBootStrap.Button variant="primary">
                    <Link to={this.state.paymentType} style={{ textDecoration: 'none', color: 'white' }}>Go next</Link>
                </ReactBootStrap.Button>
            </ReactBootStrap.Form>
            <br />


        </div>
    );
}
}

