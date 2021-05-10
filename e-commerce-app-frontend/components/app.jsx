import React from 'React'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom'
import Navbar from './navbar'
import Login from './login'
import User from './user'
import Register from './register'



export default class App extends React.Component {
    

    render() {
        return (
            <Router>
                <Navbar/>
                <br />
                <Route path="/login/" component={Login}/>
                <Route path="/user/" component={User}/>
                <Route path="/register/" component={Register}/>

            </Router>
        );
    }
}

