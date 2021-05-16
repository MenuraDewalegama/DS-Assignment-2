import React from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import {Link} from 'react-router-dom';


export default class AddProduct extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            price: '',
            quantity: '',
        };
    }

    onChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    render() {
        const {save} = this.props;
        return (
            <div className="container-sm" style={{marginTop: '50px'}}>
                <div>
                    <ReactBootStrap.Button variant="primary">
                        <Link to="/user" style={{textDecoration: 'none', color: 'white'}}>Products</Link>
                    </ReactBootStrap.Button>
                </div>

                <div style={{marginTop: '20px'}}>
                    <ReactBootStrap.Form>

                        <ReactBootStrap.Form.Group controlId="formBasicName">
                            <ReactBootStrap.Form.Label>Name</ReactBootStrap.Form.Label>
                            <ReactBootStrap.Form.Control type="text" name="name" placeholder="Name"
                                                         value={this.state.name}
                                                         onChange={event => this.onChange(event)}/>
                        </ReactBootStrap.Form.Group>

                        <ReactBootStrap.Form.Group controlId="formBasicDescription">
                            <ReactBootStrap.Form.Label>Description</ReactBootStrap.Form.Label>
                            <ReactBootStrap.Form.Control type="text" name="description" placeholder="Description"
                                                         value={this.state.description}
                                                         onChange={event => this.onChange(event)}/>
                        </ReactBootStrap.Form.Group>

                        <ReactBootStrap.Form.Group controlId="formBasicPrice">
                            <ReactBootStrap.Form.Label>Price</ReactBootStrap.Form.Label>
                            <ReactBootStrap.Form.Control type="text" name="price" placeholder="Price"
                                                         value={this.state.price}
                                                         onChange={event => this.onChange(event)}/>
                        </ReactBootStrap.Form.Group>

                        <ReactBootStrap.Form.Group controlId="formBasicQuantity">
                            <ReactBootStrap.Form.Label>Quantity</ReactBootStrap.Form.Label>
                            <ReactBootStrap.Form.Control type="text" name="quantity" placeholder="Quantity"
                                                         value={this.state.quantity}
                                                         onChange={event => this.onChange(event)}/>
                        </ReactBootStrap.Form.Group>

                        <br/>

                        <ReactBootStrap.Button variant="primary" onClick={event => {
                            event.preventDefault();
                            save({
                                name: this.state.name,
                                description: this.state.description,
                                price: this.state.price,
                                quantity: this.state.quantity
                            });
                            this.setState({name: '', description: '', price: '', quantity: ''});
                        }}>Save
                        </ReactBootStrap.Button>
                    </ReactBootStrap.Form>
                </div>
            </div>
        );
    }

}
