import React, { Component } from 'react';
import {
    Table, Badge, Container, Button,
    Form, FormGroup, FormText, FormFeedback,
    Input, Label, Row, Col, Alert,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import { connect } from 'react-redux';
import { fetchCommonData, cancelAllRequests } from '../../actions/Common/commonActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Request extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formValue: {},
            deleteModal: false
        }
        // this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    }

    componentDidMount() {
        console.log('request mounted');
        this.props.fetchCommonData();
    }

    componentWillUnmount() {
        cancelAllRequests();
    }

    onHandleChange = (e) => {
        console.log(e.target.name + ' Changed: ' + e.target.value);

        let newState = Object.assign({}, this.state.formValue, {
            [e.target.name]: e.target.value
        })

        this.setState({
            formValue: newState
        })
    }

    onSearch = () => {
        console.log(this.state.formValue);
    }

    renderSearchForm() {
        const self = this;
        const { stepchartTypeItems, statusItems, stepchartLevelItems, isCommonLoading } = this.props;
        return (
        <Container className="b-search-form-container" fluid>
            <div hidden={!isCommonLoading} className="overlay-div">
                <FontAwesomeIcon className="spin-big overlay-loader" icon="spinner" spin />
            </div>
            <Form onSubmit={this.onHandlingSearch}>
                <Row form>
                    <Col lg={3} md={6}>
                        <FormGroup>
                            <Label for="search_admin">Search</Label>
                            <Input type="text" name="search_admin" id="search_admin" onChange={self.onHandleChange} placeholder="Search" />
                        </FormGroup>
                    </Col>
                    <Col lg={3} md={6}>
                        <FormGroup>
                            <Label for="stepchart_type">Stepchart Types</Label>
                            <Input type="select" name="stepchart_type" id="stepchart_type">
                                {
                                    stepchartTypeItems ? stepchartTypeItems.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.title}</option>
                                    }) : null
                                }
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col lg={3} md={6}>
                        <FormGroup>
                            <Label for="stepchart_level">Stepchart Levels</Label>
                            <Input type="select" name="stepchart_level" id="stepchart_level" onChange={self.onHandleChange}>
                                {
                                    stepchartLevelItems ? stepchartLevelItems.map(item => {
                                        return <option key={item.value} value={item.value}>{item.title}</option>
                                    }) : null
                                }
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col lg={3} md={6}>
                        <FormGroup>
                            <Label for="status">Status</Label>
                            <Input type="select" name="status" id="status" onChange={self.onHandleChange}>
                                {
                                    statusItems ? statusItems.map(item => {
                                        return <option key={item.value} value={item.value}>{item.title}</option>
                                    }) : null
                                }
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Button color="primary" type='submit'>Search</Button>
            </Form>
        </Container>)
    }

    render() {
        const self = this;
        const { stepchartTypeItems, statusItems, stepchartLevelItems } = this.props;
        return (
            <Container fluid>
                <h1 className='text-center section-header'>Request Page</h1>
                { self.renderSearchForm() }
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    stepchartLevelItems: state.common.stepchartLevelItems,
    stepchartTypeItems: state.common.stepchartTypeItems,
    statusItems: state.common.statusItems,
    isCommonLoading: state.common.isLoading
})

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCommonData: () => {
            dispatch(fetchCommonData());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Request)
