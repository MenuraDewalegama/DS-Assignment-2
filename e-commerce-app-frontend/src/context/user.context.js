/*
@author : Dhanusha Perera
@date : 20/05/2021
*/
import React, {Component} from 'react';
import sha256 from 'crypto-js/sha256';
import {getUserByID} from '../service/user.service';

/* creating the user context with defaultValue. */
const UserContext = React.createContext({
    currentUser: null,
    addUser: (user) => {
    },
    removeUser: () => {
    }
});

class UserProvider extends Component {
    constructor(props) {
        super(props);
        this.state = null; // initial state is null because no user is logged in.
    }

    componentDidMount() {
        this.getUserFromSessionStorage().then(user => {
            this.setState({
                currentUser: user
            });
        }).catch(error => {
            this.setState({
                currentUser: null
            });
        });
    }

    /* Set initial state. if a user currently logged in,
    that means there should be value saved in the sessionStorage.
    Get the sessionStorage value(userID) and use it to retrieve all details of the user. */
    getUserFromSessionStorage() {
        /* get the userID stored in the sessionStorage*/
        const loggedInUserID = atob(sessionStorage.getItem(sha256(process.env.AUTHENTICATED_USER_ID)));

        return new Promise(async (resolve, reject) => {
            try {
                const response = await getUserByID(loggedInUserID);
                resolve(JSON.parse(response.data));
            } catch (error) {
                reject(error);
            }
        });
    }

    /* Login the user. */
    addUser(user) {
        this.setState({
            currentUser: {
                id: user.id,
                name: user.name,
                contactNo: user.contactNo,
                type: user.type
            }
        });
    }

    /** Logout the user. */
    removeUser() {
        /* remove the userID and userName from the sessionStorage. */
        sessionStorage.removeItem(sessionStorage.getItem(sha256(process.env.AUTHENTICATED_USER_ID)));
        // sessionStorage.removeItem(sessionStorage.getItem(sha256(process.env.AUTHENTICATED_USER_NAME)));

        this.setState({
            currentUser: null
        });
    }

    render() {
        return (
            <UserContext.Provider
                value={
                    {
                        currentUser: this.state.currentUser,
                        // addUser: this.addUser,
                        removeUser: this.removeUser
                    }
                }
            >
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

module.exports = {
    UserContext, UserProvider
};
