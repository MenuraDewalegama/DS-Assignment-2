import React from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import {Link} from 'react-router-dom';


export default class Credit extends React.Component {

    render() {
        return (
            <div className="container-sm">
                <br/>
                <h1>Credit card Details</h1>

                <br/>
                <br/>
                <ReactBootStrap.Form>
                    <ReactBootStrap.Form.Group controlId="formBasicEmail">
                        <ReactBootStrap.Form.Label>Amount</ReactBootStrap.Form.Label>
                        <ReactBootStrap.Form.Control type="name" placeholder="Username"/>
                    </ReactBootStrap.Form.Group>

                    <ReactBootStrap.Form.Group controlId="formBasicPassword">
                        <ReactBootStrap.Form.Label>card number</ReactBootStrap.Form.Label>
                        <ReactBootStrap.Form.Control type="name" placeholder="address"/>
                    </ReactBootStrap.Form.Group>

                    <ReactBootStrap.Form.Group controlId="Contact number">
                        <ReactBootStrap.Form.Label>CVC number</ReactBootStrap.Form.Label>
                        <ReactBootStrap.Form.Control type="name" placeholder="contact number"/>
                    </ReactBootStrap.Form.Group>


                    <ReactBootStrap.Form.Group controlId="Contact number">
                        <ReactBootStrap.Form.Label>Expirey Date</ReactBootStrap.Form.Label>
                        <ReactBootStrap.Form.Control type="name" placeholder="email"/>
                    </ReactBootStrap.Form.Group>

                    <br/>
                    <ReactBootStrap.Button variant="primary">
                        {/* // TODO: if registration successful, then redirect to root URL (/product). */}
                        <Link to="/delivery" style={{textDecoration: 'none', color: 'white'}}>Confirm</Link>
                    </ReactBootStrap.Button>
                </ReactBootStrap.Form>
                <br/>


            </div>
        );
    }
}

