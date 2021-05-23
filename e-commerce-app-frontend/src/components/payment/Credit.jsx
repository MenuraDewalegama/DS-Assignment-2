import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {cartList,cartTotal} from '../product/ProductListItem';

export default class Credit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: null,
            cardHolderName: null,
            cardNumber: null,
            cvcNumber: null,
            expireyDate: null,
            getData: this.props.getData
        };
    }
    

    onChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }
    
     confirmPayment = () => {
        const { address, email } = this.state.getData;
        console.log(address, email);

        console.log(this.state.amount);
        console.log(this.state.cardHolderName);
        console.log(this.state.cardNumber);
        console.log(this.state.cvcNumber);
        console.log(this.state.expireyDate);
        console.log(email);
        console.log(address);

        cartList.splice(0, cartList.length);

        window.location = '/products';


    };




    render() {


        const notify = () =>

        toast.success('Item purchased succesfully. Please check your mail inbox', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    

        return (
            <div className="container-sm">
                <br />
                <h1>Payment Details</h1>

                <br />
                <br />

                <Form>

                    <Form.Group controlId="formBasicCardHOlderName">
                        <Form.Label>Card holder's name</Form.Label>
                        <Form.Control name="cardHolderName"
                            type="text"
                            placeholder="Card holder's name"
                            onChange={(event) => this.onChange(event)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicCardNumber">
                        <Form.Label>Card Number</Form.Label>
                        <Form.Control name="cardNumber"
                            type="text"
                            placeholder="Card Number"
                            onChange={(event) => this.onChange(event)}
                        />
                    </Form.Group>


                    <Form.Group controlId="formBasicCVC">
                        <Form.Label>CVC Number</Form.Label>
                        <Form.Control name="cvcNumber"
                            type="text"
                            placeholder="CVC Number"
                            onChange={(event) => this.onChange(event)}
                        />
                    </Form.Group>


                    <Form.Group controlId="formBasicED">
                        <Form.Label>Expire Date</Form.Label>
                        <Form.Control name="expireyDate"
                            type="text"
                            placeholder="Expire Number"
                            onChange={(event) => this.onChange(event)}
                        />
                    </Form.Group>



                    <Form.Group controlId="formBasicAmount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control name="amount"
                            type="text"
                            placeholder="Amount"
                            value={cartTotal}
                            disabled
                            onChange={(event) => this.onChange(event)}
                        />
                    </Form.Group>

                    <hr></hr>
                    <br />
                    <Link to="/">
                    <Button  onClick={() => {
                                            this.confirmPayment();
                                            notify();
                                        }}
                                        variant="primary"> Confirm
                        {/* // TODO: if registration successful, then redirect to root URL (/product). */}
                        {/* <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Confirm</Link> */}
                    </Button></Link>
                </Form>
                <br />
            </div>
        );
    }
}

