import React from 'react';
import {render} from 'react-dom';
import App from './App';
import {UserProvider} from './src/context/user.context';
import {ProductProvider} from './src/context/product.context';

render(
    <ProductProvider>
        <UserProvider>
            <App/>
        </UserProvider>
    </ProductProvider>
    , document.getElementById('app'));

