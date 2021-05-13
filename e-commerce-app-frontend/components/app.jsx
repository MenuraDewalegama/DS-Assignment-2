import React from 'React'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom'
import Navbar from './navbar'
import Login from './login'
import User from './user'
import Register from './register'
import Main from './main';



export default class App extends React.Component {
    

    render() {
        return (

            <Router>
                <Switch>
                    <Route path='/'>
                        <Navbar />
                        <Main />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

