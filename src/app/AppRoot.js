import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import { AppLoader } from './component/Loader/AppLoader'
import { history } from './configureStore';
import { App } from './pages/App/App';

function PrivateRoute({ component: Component, authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
        />
    )
}

function PreventRoute({ component: Component, authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Redirect to={{ pathname: '/song', state: { from: props.location } }} />
                : <Component {...props} />
            }
        />
    )
}


const Login = Loadable({
    loader: () => import('./pages/Login'),
    loading() {
        return <AppLoader />
    }
});

class AppRoot extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('root component mounted');
    }

    render() {
        const { store } = this.props;
        const isAuthenticated = localStorage.getItem('authToken') ? true : false;
        console.log(isAuthenticated);
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Switch>
                        <PreventRoute authed={isAuthenticated} path='/login' component={Login} />
                        <PrivateRoute authed={isAuthenticated} path='/' component={App} />
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

AppRoot.propTypes = {
    store: PropTypes.object.isRequired
}

export default AppRoot