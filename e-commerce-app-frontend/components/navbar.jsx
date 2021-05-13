import React from 'react';
import * as ReactBootStrap from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Redirect, Link, NavLink } from 'react-router-dom'
import Login from './login'


export default function ButtonAppBar() {


    return (

        <ReactBootStrap.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <ReactBootStrap.Navbar.Brand >E-Commerce App</ReactBootStrap.Navbar.Brand>
            <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                <ReactBootStrap.Nav className="mr-auto">
                    <Link to="/" className="nav-link">Home</Link>
                </ReactBootStrap.Nav>
                <ReactBootStrap.Nav>
                    <Link to="/login" className="nav-link" >Login</Link>
                </ReactBootStrap.Nav>
            </ReactBootStrap.Navbar.Collapse>
        </ReactBootStrap.Navbar>

        // <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        //     <Link className="navbar-brand">Navbar</Link>
        //     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        //         <span className="navbar-toggler-icon"></span>
        //     </button>

        //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //         <ul className="navbar-nav mr-auto">
        //             <li className="nav-item">
        //                 <Link to="/" className="nav-link">Home</Link>
        //             </li>
        //             <li className="nav-item">
        //                 <Link to="/home/login" className="nav-link" >Login</Link>
        //             </li>
        //             <li className="nav-item">
        //                 <Link className="nav-link">Disabled</Link>
        //             </li>
        //         </ul>
        //     </div>
        // </nav>

    );
}