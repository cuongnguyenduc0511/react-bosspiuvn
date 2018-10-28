import React, { Component } from 'react';
import {
    Button,
    Form, FormGroup, FormText, FormFeedback,
    Input, Label, Row, Col, Alert
} from 'reactstrap';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
// import mainLogo from '../assets/images/BOSS_PIUVN.png';
import '../assets/css/login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { authenticate, resetAllState } from '../actions/Auth/authActions';
import { push } from 'react-router-redux';
import { isFormValid } from '../helpers/form-validator';
import store from '../configureStore';
import { authActions } from '../actions/Auth/authActionTypes';

const formConstraints = {
    username: {
        presence: {
            message: 'Username is required',
            allowEmpty: false
        },
        length: {
            minimum: 6,
            message: "Username must be at least 6 characters",
        }
    },
    password: {
        presence: {
            message: 'Password is required',
            allowEmpty: false
        },
        length: {
            minimum: 6,
            message: "Password must be at least 6 characters",
        }
    }
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValue: {
                username: null,
                password: null
            },
        }
    }

    componentDidMount() {
        console.log('login mounted');
        store.dispatch(resetAllState());
    }

    onHandleSubmit = (event) => {
        event.preventDefault();
        const self = this;
        const formValue = self.state.formValue;
        self.setState({
            isFormSubmit: true
        })

        if (isFormValid(formValue, formConstraints, self)) {
            console.log('Valid');
            self.props.authenticate(formValue);
        }
    }

    onHandleChange = (e) => {
        const self = this;
        let newState = Object.assign({}, self.state.formValue, {
            [e.target.name]: e.target.value
        });

        self.setState({
            formValue: newState
        })

        if(self.state.isFormSubmit) {
            setTimeout(function() {
                isFormValid(self.state.formValue, formConstraints, self);
                console.log(self.state);
            }, 1);    
        }
    }

    render() {
        document.getElementsByTagName('body')[0].className = 'body-login text-center';
        const { isLoading, error } = this.props;
        const { formErrors } = this.state;
        if (localStorage.getItem('authToken')) {
            return <Redirect to="/song" />
        }

        return (
            <Form className="b-login-form" onSubmit={this.onHandleSubmit}>
                <img className="img-fluid mb-4" width={200} src={`http://localhost:3000/images/BOSS_PIUVN.png`} />
                <h1 className={'h3 mb-3 font-weight-normal'}>Login Page</h1>
                <Row form>
                    <Col lg={12}>
                        <FormGroup>
                            <Label for="username" className={"float-left"}>Username</Label>
                            <Input invalid={formErrors && formErrors.username ? true : false} disabled={isLoading} type="text" name="username" id="username" placeholder="Enter your username" onChange={this.onHandleChange} />
                            <FormFeedback className={"form-feedback-text"}>{ formErrors && formErrors.username ? formErrors.username.errorMessage : null }</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col lg={12}>
                        <FormGroup>
                            <Label for="password" className={"float-left"}>Password</Label>
                            <Input invalid={formErrors && formErrors.password ? true : false} disabled={isLoading} type="password" name="password" id="password" placeholder="Enter your password" onChange={this.onHandleChange} />
                            <FormFeedback className={"form-feedback-text"}>{ formErrors && formErrors.password ? formErrors.password.errorMessage : null }</FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>
                <Alert hidden={!error} color="danger">
                    Authentication Failed: {error}
                </Alert>
                <Button disabled={isLoading} type='submit' color="primary" size="lg" block>
                    {isLoading ? <FontAwesomeIcon icon="spinner" spin /> : null}
                    &nbsp;Sign In
                </Button>
                <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
            </Form>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.auth.isLoading,
    error: state.auth.error,
    success: state.auth.success
})

const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: (formValue) => {
            dispatch(authenticate(formValue))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)