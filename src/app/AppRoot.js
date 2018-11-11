import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable';
import { AppLoader } from './component/Loader/AppLoader'
import { history } from './configureStore';
import App from './pages/App/App';

const Login = Loadable({
    loader: () => import('./pages/Login'),
    loading() {
        return <AppLoader />
    },
});

class AppRoot extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { store } = this.props;

        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                localStorage.getItem('authToken')
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }} />
            )} />
        )

        return (
            <Provider store={store}>
                <Router history={history}>
                    <Switch>
                        <Route path='/login' component={Login} />
                        <PrivateRoute path='/' component={App} />
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