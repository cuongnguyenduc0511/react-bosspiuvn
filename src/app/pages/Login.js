import React, { Component } from 'react';
import {
    Button,
    Form, FormGroup, FormText, FormFeedback,
    Input, Label, Row, Col, Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import mainLogo from '../assets/images/BOSS_PIUVN.png';
import '../assets/css/login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { authenticate } from '../actions/Auth/authActions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        console.log('login mounted');
    }

    onHandleSubmit = (event) => {
        event.preventDefault();
        const formValue = this.state.formValue;
        this.props.authenticate(formValue);
    }

    onHandleChange = (e) => {
        let newState = Object.assign({}, this.state.formValue, {
            [e.target.name]: e.target.value
        });

        this.setState({
            formValue: newState
        })
    }


    render() {
        document.getElementsByTagName('body')[0].className = 'body-login text-center';
        const { isLoading, error } = this.props;
        return (
            <Form className="b-login-form" onSubmit={this.onHandleSubmit}>
                <img className="img-fluid mb-4" width={200} src={mainLogo} />
                <h1 className={'h3 mb-3 font-weight-normal'}>Login Page</h1>
                <Row form>
                    <Col lg={12}>
                        <FormGroup>
                            <Label for="username" className={"float-left"}>Username</Label>
                            <Input disabled={isLoading} type="text" name="username" id="username" placeholder="Enter your username" onChange={this.onHandleChange} />
                            <FormFeedback className={"form-feedback-text"}>Oh noes! that name is already taken</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col lg={12}>
                        <FormGroup>
                            <Label for="username" className={"float-left"}>Password</Label>
                            <Input disabled={isLoading} type="password" name="password" id="password" placeholder="Enter your password" onChange={this.onHandleChange} />
                            <FormFeedback className={"form-feedback-text"}>Oh noes! that name is already taken</FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>
                <Alert hidden={!error} color="danger">
                    Authentication Failed: {error}
                </Alert>
                <Button disabled={isLoading} type='submit' color="primary" size="lg" block>
                    { isLoading ? <FontAwesomeIcon icon="spinner" spin /> : null}
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