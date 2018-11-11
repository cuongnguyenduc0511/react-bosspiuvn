import React, { Component } from 'react';
import { signOut } from '../actions/Auth/authActions';
import { connect } from 'react-redux';

class Logout extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('logout mounted ! sign out immediately');
        const { signOut } = this.props;
        signOut();
    }

    render() {
        return null;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => {
            dispatch(signOut())
        }
    }
}

export default connect(null, mapDispatchToProps)(Logout)