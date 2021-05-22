import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './src/components/navigation-bar/Navbar';
import Main from './src/components/Main';
<<<<<<< HEAD
import sha256 from 'crypto-js/sha256';
=======
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
>>>>>>> 286ae4f (cart function almost done)

export default class App extends React.Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/">
                        {/* navigation bar component. */}
                        <Navbar />
                        {/* main component. */}
                        <Main />
                        <ToastContainer />


                    </Route>
                </Switch>
            </Router>
        );
    }
}

