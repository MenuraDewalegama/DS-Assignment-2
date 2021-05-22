import React, {Component} from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Prompt extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: '',
            redirectTo: '/',
            redirectPageName: 'main'
        };
    }

    componentDidMount() {
        this.setState({
            message: (this.props.message) ? this.props.message : 'Action is not completed successfully!',
            redirectTo: (this.props.redirectTo) ? this.props.redirectTo : this.state.redirectTo,
            redirectPageName: (this.props.redirectPageName) ? this.props.redirectPageName : this.state.redirectPageName,
        });
    }

    render() {
        return (
            <div>
                <ReactBootStrap.Container>
                    <h4>{this.state.message}</h4>
                    <Link to={this.state.redirectTo}>click here to redirect to
                        the {this.state.redirectPageName} page</Link>
                </ReactBootStrap.Container>
            </div>
        );
    }
}

Prompt.defaultProps = {
    message: 'Action is not completed successfully!',
    redirectTo: '/',
    redirectPageName: 'Main'
};

export default Prompt;
