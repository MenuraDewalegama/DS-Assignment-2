import React from 'react';
import {Button, Col, Container, Form, Image, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Prompt from '../prompt/Prompt';
import {ProductContext} from '../../context/product.context';

export default class AddEditProduct extends React.Component {

    static contextType = ProductContext;

    constructor(props) {
        super(props);

        /* initial state. */
        this.state = {
            isAdding: true, // true = dealing with an insertion operation.
            isProductIdValid: false,
            productRecord: null, // if matching record found, then we can store it here
            productId: 0,
            name: '',
            description: '',
            unitPrice: 0.00,
            handOnQuantity: 0,
            imagePath: '',
            imageFile: null
        };
    }

    /* life cycle. */
    componentDidMount() {

        console.log('add-edit : ', this.context);

        /* get the product id from the URL and assign it to state(productId). */
        const productIDFromURL = this.props.match.params?.productID;
        // console.log(typeof productIDFromURL); // string
        if (productIDFromURL) {
            /* set isAdding to false because we deal with updating a record. */
            this.setState({
                isAdding: false, // false = we deal with a update operation
            });

            // TODO: validate productID
            if (/^[A-Za-z0-9]{24}$/.test(productIDFromURL)) {
                this.setState({
                    isProductIdValid: true,
                    productId: productIDFromURL
                });

                // TODO: getProductById.
                /* find the a matching record by given ID,
                * if no matching record found set the state(productRecord) to null,
                * if matching record is found. */
                // TODO: set state(imagePath), if found matching record.
                this.context.getProductByID(productIDFromURL).then(productElem => {
                    // console.log(productElem);
                    this.setState({
                        productRecord: productElem,
                        productId: productElem?._id,
                        name: productElem?.name,
                        description: productElem?.description,
                        unitPrice: productElem?.unitPrice,
                        handOnQuantity: productElem?.handOnQuantity,
                        imagePath: (productElem?.imagePath) ? productElem?.imagePath : '',
                        imageFile: null
                    });
                }).catch(reason => {
                    console.error(reason);
                });

            }
            console.log(productIDFromURL);
        }
    }

    /** Set other user inputs in the form to the component state.
     * @param event */
    onChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    /** Set image file to the component state when user upload a image file.
     * @param event */
    onChangeProductFormFile(event) {
        console.log(event.target.files[0]);
        const imageFile = event.target.files[0];
        this.setState({imageFile: (imageFile) ? imageFile : null});
    }

    /* Remove Image button process - we just remove the imagePath. */
    removeImagePath() {
        this.setState({
            imagePath: ''
        });
    }

    /** perform save or update operation.
     * @param saveOrUpdate addProduct method or updateProduct method. */
    performSaveOrUpdate(saveOrUpdate) {
        let productObject = {
            name: this.state.name,
            description: this.state.description,
            unitPrice: this.state.unitPrice,
            handOnQuantity: this.state.handOnQuantity,
        };

        /* if image is uploaded, then assign it to productObject. */
        if (this.state.imageFile) {
            productObject.productImage = this.state.imageFile;
        } else {
            /* existing imagePath is assigned to the productObject.
            * That means no image update happens. */
            productObject.imagePath = this.state.imagePath;
        }

        if (this.state.isAdding) {
            /* add a new product. */
            if (productObject.hasOwnProperty('imagePath') && productObject.imagePath.length === 0) {
                delete productObject.imagePath;
            }
            saveOrUpdate(productObject).then(value => {
                // TODO: display insert successful or not
                // display insertion successful
                console.log('Product added successfully!');
                window.location = '/';
            }).catch(reason => {
                console.error(reason);
            });
        } else {
            /* update operation. */
            productObject.id = this.state.productId;
            saveOrUpdate(productObject).then(value => {
                // TODO: display update successful or not
                // display updated successfully
                console.log('Product updated successfully!');
                window.location = '/';
            }).catch(reason => {
                console.error(reason);
            });
        }
        this.setState({
            isProductIdValid: false,
            productRecord: null, // if matching record found, then we can store it here
            productId: 0,
            name: '',
            description: '',
            unitPrice: 0.00,
            handOnQuantity: 0,
            imagePath: '',
            imageFile: null
        });
    }

    render() {
        const {saveOrUpdate} = this.props;

        /* if we deal with updating a product and the product id is not valid.
        Then, display invalid.*/
        if (!this.state.isProductIdValid && !this.state.isAdding) {
            const message = 'Product ID is invalid';
            return (
                <><Prompt message={message}/></>
            );
        }

        /* if no matching record found. */
        // TODO: if no matching record is found then, display 'no matching record is found'
        if (!this.state.productRecord && !this.state.isAdding) {
            const message = 'No matching product record found.';
            return (
                <><Prompt message={message}/></>
            );
        }

        return (
            <div>
                <div className="container-sm" style={{padding: '2rem 0'}}>
                    <Container className="p-0">
                        <Row>
                            <Col>
                                {(this.state.isAdding) ?
                                    < h2>Add New Product</h2> : <h2>Edit Product</h2>
                                }
                            </Col>
                        </Row>
                    </Container>

                    <div style={{marginTop: '20px'}}>
                        <Form>

                            <Form.Group controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" placeholder="Name"
                                              value={this.state.name}
                                              onChange={event => this.onChange(event)}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" type="text" name="description"
                                              placeholder="Description"
                                              value={this.state.description}
                                              onChange={event => this.onChange(event)}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicPrice">
                                <Form.Label>Unit Price</Form.Label>
                                <Form.Control type="text" name="unitPrice" placeholder="Unit Price"
                                              value={this.state.unitPrice}
                                              pattern="^\d*(\.\d{0,2})?$"
                                              onChange={event => this.onChange(event)}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicQuantity">
                                <Form.Label>Hand On Quantity</Form.Label>
                                <Form.Control type="text" name="handOnQuantity"
                                              placeholder="Hand On Quantity"
                                              value={this.state.handOnQuantity}
                                              onChange={event => this.onChange(event)}/>
                            </Form.Group>


                            <Form.Group controlId="formProductImage">
                                <Container style={{padding: 0, marginTop: '1.5rem'}}
                                           className="productImageContainer">
                                    {(this.state.isAdding) ? '' :
                                        <><Image
                                            style={{width: '300px'}}
                                            src={(this.state?.imagePath) ?
                                                `http://localhost:3000${this.state.imagePath}` :
                                                `https://via.placeholder.com/300`}
                                            alt={`${this.state.name} product image`}
                                            rounded/>

                                            <div>
                                                <Button variant="secondary"
                                                        style={{
                                                            marginTop: '1.2rem'
                                                        }}
                                                        onClick={this.removeImagePath.bind(this)}>Remove Image</Button>
                                            </div>
                                        </>
                                    }
                                </Container>

                                <br/>

                                <Form.File id="id_productImage"
                                           label="Upload Product Image"
                                           onChange={event => this.onChangeProductFormFile(event)}/>
                            </Form.Group>

                            <br/>

                            <Container style={{padding: 0}}>
                                <Row>
                                    <Col>
                                        <Button style={{marginRight: '1.2rem'}} variant="primary"
                                                onClick={event => {
                                                    event.preventDefault();

                                                    /* perform save or update operation. */
                                                    this.performSaveOrUpdate(saveOrUpdate);

                                                }}>{
                                            (this.state.isAdding) ? 'Save' : 'Edit'
                                        }
                                        </Button>
                                    </Col>
                                    <Col style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        justifyItems: 'center'
                                    }}>
                                        <Button variant="primary">
                                            <Link to="/products"
                                                  style={{textDecoration: 'none', color: 'white'}}>Cancel</Link>
                                        </Button>
                                    </Col>
                                </Row>

                                {/*<ReactBootStrap.Button variant="secondary" as="input" type="reset" value="Reset"/>*/}
                            </Container>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }

}
