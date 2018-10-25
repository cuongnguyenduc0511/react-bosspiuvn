import React, { Component } from 'react';
import {
    Table, Badge, Container, Button,
    Form, FormGroup, FormText, FormFeedback,
    Input, Label, Row, Col, Alert,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import { connect } from 'react-redux';
import { fetchCommonData, fetchStepchartLevels, fetchStepchartTypes } from '../../actions/Common/commonActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchRequests, requestSource, saveSearchValue } from '../../actions/Request/requestActions';
import { ListPagination } from '../../component/ListPagination';
import { cancelAllPendingRequests } from '../../helpers/axios-cancellation';

const requestListStyle = {
    position: 'relative',
    height: '100%'
}

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

        const { stepchartTypeItems, statusItems, requestResult, fetchRequests, fetchCommonData, fetchStepchartLevels } = this.props;
        
        if (!stepchartTypeItems || !statusItems) {
            fetchCommonData();
        } 

        if(!requestResult) {
            fetchRequests();
        }

        fetchStepchartLevels();
    }

    componentWillUnmount() {
        cancelAllPendingRequests();
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

    onSearch = (e) => {
        e.preventDefault();
        const formValue = this.state.formValue;
        this.props.saveSearchValue(formValue);
        this.props.fetchRequests({params: formValue});
    }

    onPageChanged = (pageNumber) => {
        const queryParams = this.props.requestResult.queryParams;
        const params = {
            page: pageNumber,
            params: queryParams
        }
        this.props.fetchRequests(params);
    }

    onStepchartTypeChanged = (e) => {
        const stepLevelElement = document.getElementById('stepchart_level');

        this.props.fetchStepchartLevels(e.target.value);

        this.onHandleChange(e);
        
        setTimeout(function () {
            //reflect value changes
            var evt = document.createEvent('HTMLEvents');
            stepLevelElement.value = stepLevelElement.value;
            evt.initEvent('change', true, true);
            stepLevelElement.dispatchEvent(evt);
        });
    }

    onMasterCheckboxChanged = (event) => {
        // console.log('Master Checkbox Changed: ' + event.target.checked);
        const isMasterCheckboxChecked = event.target.checked;
        let itemCheckboxes = document.getElementsByClassName('item-checkbox');
        for (let i = 0; i < itemCheckboxes.length; i++) {
            itemCheckboxes[i].checked = isMasterCheckboxChecked ? true : false;
        }
    }

    onItemCheckboxChanged = (event) => {
        const checkedCheckboxValues = this.getCheckedCheckboxValues();
        const totalItems = document.getElementsByClassName('item-checkbox').length;
        const masterCheckboxElement = document.getElementById('master-checkbox');
        console.log(`Item checkbox ${event.target.value} check changed: ${event.target.checked}`);
        if (checkedCheckboxValues.length > 0) {
            masterCheckboxElement.checked = (checkedCheckboxValues.length === totalItems) ? true : false
        } else {
            masterCheckboxElement.checked = false;
        }
        console.log(document.getElementById('app-loader'));
    }

    getCheckedCheckboxValues() {
        const checkedCheckboxes = document.querySelectorAll('.item-checkbox:checked');
        let checkedCheckboxesValue = [];
        for (var i = 0; checkedCheckboxes[i]; ++i) {
            checkedCheckboxesValue.push(checkedCheckboxes[i].value);
        }
        return checkedCheckboxesValue;
    }


    renderSearchForm() {
        const self = this;
        const { stepchartTypeItems, statusItems, stepchartLevelItems, isCommonLoading, isRequestLoading } = this.props;
        return (
            <Container className="b-search-form-container" fluid>
                <div hidden={!isCommonLoading && !isRequestLoading} className="overlay-div">
                    <FontAwesomeIcon className="spin-big overlay-loader" icon="spinner" spin />
                </div>
                
                <Form onSubmit={this.onSearch}>
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
                                <Input type="select" name="stepchart_type" id="stepchart_type" onChange={self.onStepchartTypeChanged}>
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

    renderTableList() {
        const self = this;
        const { isRequestLoading, requestResult } = self.props;
        console.log(requestResult);
        const requestItems = requestResult ? requestResult.items : null;

        function importAll(r) {
            // return r.keys().map(r);
            let images = {};
            r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
            return images;
        }

        var stepLevelImages = importAll(require.context('../../assets/images/stepball_levels', false, /\.(png|jpe?g|svg)$/));

        return (
            <Container fluid style={requestListStyle}>
                <div hidden={!isRequestLoading} className="overlay-div">
                    <FontAwesomeIcon className="spin-big overlay-loader" icon="spinner" spin />
                </div>

                <Table hidden={!isRequestLoading && (requestResult && requestResult.items.length === 0)} id='request-list' responsive>
                    <thead>
                        <tr>
                            <th><Input id={"master-checkbox"} className={'table-checkbox'} type='checkbox' onChange={self.onMasterCheckboxChanged} /></th>
                            <th>Song Name</th>
                            <th>Level</th>
                            <th>Requester</th>
                            <th>STEPMAKER</th>
                            <th>Request Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            requestItems ? requestItems.map(function (requestItem, index) {
                                const stepchartInfo = requestItem.stepchart_info;
                                const requestStatus = requestItem.status;
                                const badgeColor = requestStatus.client_label_class.split('-')[1].toString();
                                const imgName = `${stepchartInfo.stepchart_type_value}-${stepchartInfo.stepchart_level}.png`;
                                return <tr key={requestItem._id}>
                                    <td><Input className={'table-checkbox item-checkbox'} value={requestItem._id} type='checkbox' onClick={self.onItemCheckboxChanged} /></td>
                                    <td>{requestItem.song_name}</td>
                                    <td><img className="stepball" src={stepLevelImages[imgName]} /></td>
                                    <td>{requestItem.requester}</td>
                                    <td>{requestItem.stepmaker}</td>
                                    <td>{new Date(requestItem.request_date).toLocaleString()}</td>
                                    <td>
                                        <h4><Badge color={badgeColor}>{requestStatus.display_text}</Badge></h4>
                                    </td>
                                    <td>
                                        <Button color="primary">Edit</Button>
                                        &nbsp;
                                <Button color="danger" onClick={self.toggleDeleteModal}>Delete</Button>
                                    </td>
                                </tr>
                            }) : null
                        }
                    </tbody>
                </Table>
                {(requestResult && requestResult.items.length > 0) ? <ListPagination onPageChanged={this.onPageChanged} result={requestResult} /> : null}
            </Container>
        )
    }

    render() {
        const self = this;
        const { stepchartTypeItems, statusItems, stepchartLevelItems } = this.props;
        return (
            <Container fluid>
                <h1 className='text-center section-header'>Request Page</h1>
                {self.renderSearchForm()}
                {self.renderTableList()}
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    stepchartLevelItems: state.common.stepchartLevelItems,
    stepchartTypeItems: state.common.stepchartTypeItems,
    statusItems: state.common.statusItems,
    isCommonLoading: state.common.isLoading,
    requestResult: state.request.requestResult,
    isRequestLoading: state.request.isLoading
})

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCommonData: () => {
            dispatch(fetchCommonData());
        },
        fetchRequests: ({ params = null, page = null } = {}) => {
            dispatch(fetchRequests(page, params));
        },
        fetchStepchartLevels: (stepchartType = '') => {
            dispatch(fetchStepchartLevels(stepchartType));
        },
        saveSearchValue: (formValue) => {
            dispatch(saveSearchValue(formValue));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Request)
