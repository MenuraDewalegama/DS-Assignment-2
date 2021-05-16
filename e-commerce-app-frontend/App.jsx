import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './src/components/Navbar';
import Main from './src/components/Main';

export default class App extends React.Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/'>
                        {/* navigation bar component. */}
                        <Navbar/>
                        {/* main component. */}
                        <Main/>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

