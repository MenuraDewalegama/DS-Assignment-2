import React from 'react';
import {render} from 'react-dom';
import App from './App';
import {UserProvider} from './src/context/user.context';
import {ProductProvider} from './src/context/product.context';
import {CartProvider} from './src/context/cart.context';

render(
    <CartProvider>
        <ProductProvider>
            <UserProvider>
                <App/>
            </UserProvider>
        </ProductProvider>
    </CartProvider>
    , document.getElementById('app'));

