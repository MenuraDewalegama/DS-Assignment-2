import React, {useState} from 'react';
import {Button, Card, Col, Row} from 'react-bootstrap';
/*icons*/
import {CartPlus, PencilSquare} from 'react-bootstrap-icons';
import {Link, useHistory} from 'react-router-dom';
import sha256 from 'crypto-js/sha256';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* TODO: this will be removed. */
export const cartList = [];

const fontStyle = {
    fontSize: 'medium',
};

export default function ProductListItem(props) {
    const {product, selectProduct} = props;
    let history = useHistory();

    const [isAdmin, setIsAdmin] = useState(
        atob(
            sessionStorage.getItem(sha256(process.env.AUTHENTICATED_USER_TYPE))
        ) === 'ADMIN'
    );

    /* add the product in to cart. */
    const onClickAddToCart = () => {
        cartList.push(product);
        console.log(cartList);
    };

    /** redirecting to the edit page,using product ID. */
    const redirectToEdit = () => {
        history.push(`/products/${product?._id}/edit`);
    };

    const notify = () =>
        toast.info('Item added to the Cart', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    return (
        <div style={{marginRight: '5%'}}>
            <br/>
            <Row>
                <Col>
                    <Card style={{width: '20rem', height:'40rem'}}>
                        <Card.Img
                            style={{objectFit: 'cover', maxHeight: '300px'}}
                            variant="top"
                            src={
                                product?.imagePath
                                    ? `${process.env.ECOMMERCE_BACKEND_API_URL_FOR_IMAGE}${product?.imagePath}`
                                    : 'https://via.placeholder.com/300'
                            }
                            alt="Product image"
                        />
                        <Card.Body>
                            <Card.Title>Name: {product.name}</Card.Title>
                            <Card.Text style={fontStyle}>
                                Description: {product.description}
                            </Card.Text>
                            <Card.Text>Unit Price: {product.unitPrice}</Card.Text>
                            <Card.Text>Hand On Quantity: {product.handOnQuantity}</Card.Text>

                            <Row style={{marginTop: '25%'}}>
                                {
                                    // product edit button
                                    isAdmin ? (
                                        <Button
                                            style={{margin: 'auto', padding: '0.4rem 1rem'}}
                                            variant="primary"
                                            onClick={() => {
                                                selectProduct(product);
                                                redirectToEdit();
                                            }}
                                            title="Edit Product"
                                        >
                                            <PencilSquare style={{fontSize: '1.6rem'}}/>
                                        </Button>
                                    ) : (
                                        ''
                                    )
                                }

                                <Link to="/cart" style={{color: 'white', margin: 'auto'}}>
                                    <Button
                                        style={{margin: 'auto', padding: '0.4rem 1rem'}}
                                        variant="primary"
                                        onClick={() => {
                                            selectProduct(product);
                                            onClickAddToCart(product);
                                            notify();
                                        }}
                                        title="Add to Cart"
                                    >
                                        <CartPlus style={{fontSize: '1.6rem'}}/>
                                    </Button>
                                </Link>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
