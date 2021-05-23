import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Credit from './Credit'
import Mobile from './Mobile'


export default class PaymentHolder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            paymentType: '',
            address: null,
            email: null
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
                <h1>Finish your order here!</h1>
                <br /><br />
                <Form>


                   
                    <Form.Group controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control name="address"
                            type="text"
                            placeholder="Address"
                            onChange={(event) => this.onChange(event)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email"
                            type="text"
                            placeholder="email"
                            onChange={(event) => this.onChange(event)}
                        />
                    </Form.Group>


                    {(this.state.email != null && this.state.address != null) ?
                       <Form.Group controlId="formPaymentType">
                       <Form.Label>Payment Type</Form.Label>
                       <Form.Control name="paymentType" as="select" onChange={event => this.onChange(event)}
                           value={this.state.value}>    
                           <option value="mobile">Mobile</option>
                           <option value="credit">Credit</option>
                         
                       </Form.Control>
                   </Form.Group>
                        :
                   ''
                    }

                   


                </Form>

                <Container>
                    {(this.state.paymentType == 'credit') ?
                        <Credit getData={{ address: this.state.address, email: this.state.email }} />
                        :
                        <Mobile />
                    }

                </Container>





                <br />
            </div>
        );
    }
}

