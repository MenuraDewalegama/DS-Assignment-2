/*
@author : Dhanusha Perera
@date : 23/05/2021
*/
import React, {useContext} from 'react';
import {ProductContext} from '../../context/product.context';
import {Container, Form} from 'react-bootstrap';

function ProductSearch(props) {
    const {filterProductsByName} = useContext(ProductContext);

    /** Search prodcut by name. */
    const searching = (event) => {
        event.stopPropagation();
        const searchKeyValue = event.target.value;
        filterProductsByName(searchKeyValue).then(console.log).catch(console.error);
    };

    return (
        <div>
            <Container>
                <Form>
                    <Form.Control type="text"
                                  name="productName"
                                  placeholder="Search Product by Name"
                                  onChange={searching}
                    />
                </Form>
            </Container>
        </div>
    );
}

export default ProductSearch;
