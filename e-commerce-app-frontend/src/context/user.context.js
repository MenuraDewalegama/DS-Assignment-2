/*
@author : Dhanusha Perera
@date : 20/05/2021
*/
import React, {Component} from 'react';
import UserService from '../service/user.service';
import sha256 from 'crypto-js/sha256';

/* creating the user context with defaultValue. */
const UserContext = React.createContext({
    currentUser: null,
    authenticateUser: () => {
    },
    logOutUser: () => {
    }
});

class UserProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: null, // initial currentUser is null because no user is logged in.
            authenticateUser: this._authenticateUser.bind(this),
            addUser: this._addUser.bind(this), // this will not be very much useful, though...
            logOutUser: this._removeUser.bind(this)
        };
    }

    async componentDidMount() {
        const userIdValue = sessionStorage.getItem(sha256(process.env.AUTHENTICATED_USER_ID));
        const userNameValue = sessionStorage.getItem(sha256(process.env.AUTHENTICATED_USER_NAME));
        const userTypeValue = sessionStorage.getItem(sha256(process.env.AUTHENTICATED_USER_TYPE));
        if (userIdValue && userNameValue && userTypeValue) {
            this.setState({
                currentUser: {
                    _id: atob(userIdValue),
                    name: atob(userNameValue),
                    type: atob(userTypeValue)
                }
            });
        }
    }

    /** Authenticate the user.
     * @return Promise with result. if success return boolean true.
     * otherwise reject error. */
    _authenticateUser({userID, password}) {
        const credentials = {
            userID: userID,
            password: password
        };
        console.log('credentials: ', credentials);
        return new Promise(async (resolve, reject) => {
            try {
                const jwtToken = await UserService.authenticate(credentials);
                if (jwtToken) {
                    console.log(`JSON Web Token: ${jwtToken}`);
                    if (await this.setUserToCurrentUser(credentials.userID)) {
                        resolve(true);
                    }
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    setUserToCurrentUser(userID) {
        return new Promise(async (resolve, reject) => {
            try {
                const authUser = await UserService.getUserByID(userID);
                console.log(`authUser: ${authUser?._id}`);
                /** Save current logged in user ID in the session storage. */
                sessionStorage.setItem(sha256(process.env.AUTHENTICATED_USER_ID),
                    btoa(authUser?._id));
                /** Save current logged in user Name in the session storage. */
                sessionStorage.setItem(sha256(process.env.AUTHENTICATED_USER_NAME),
                    btoa(authUser?.name));
                /** Save current logged in user TYPE in the session storage. */
                sessionStorage.setItem(sha256(process.env.AUTHENTICATED_USER_TYPE),
                    btoa(authUser?.type));
                this._addUser(authUser);
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    }

    _addUser(user) {
        this.setState({
            currentUser: user
        });
    }

    _removeUser() {
        sessionStorage.removeItem(sha256(process.env.JWT_TOKEN_NAME));
        sessionStorage.removeItem(sha256(process.env.AUTHENTICATED_USER_ID));
        sessionStorage.removeItem(sha256(process.env.AUTHENTICATED_USER_NAME));
        sessionStorage.removeItem(sha256(process.env.AUTHENTICATED_USER_TYPE));
        this.setState({
            currentUser: null
        });
    }

    render() {
        return (
            <UserContext.Provider
                value={
                    {
                        ...this.state,
                    }
                }
            >
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

const UserConsumer = UserContext.Consumer;
module.exports = {
    UserContext, UserProvider, UserConsumer
};
