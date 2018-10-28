import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
	Table, Badge, Container, Button,
	Form, FormGroup, FormText, FormFeedback,
	Input, Label, Row, Col, Alert,
	Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import Select from 'react-select';

const options = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' }
];

class RequestEdit extends Component {
	state = {
	}

	componentDidMount() {
		console.log('Request Edit Mounted');
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
	
	onSelectChange(e, inputName) {
		const self = this;
		console.log(inputName);
		let newState = Object.assign({}, self.state.formValue, {
            [inputName] : e.value
		});
		
		self.setState({
			formValue: newState
		});		
	}

	render() {
		const isFieldError = true;
		const self = this;
		const { formValue } = self.state;
		return (
			<Container fluid>
				<h1 className='text-center section-header'>Request Edit Page</h1>
				<Form onSubmit={this.onSearch}>
					<Row>
						<Col lg={5} md={12}>
							<Row form>
								<Col md={12}>
									<FormGroup>
										<Label for="song_name">Song Name</Label>
										<Select onChange={(e) => self.onSelectChange(e, 'song_name')} classNamePrefix={isFieldError ? 'form-control-invalid' : 'form-control'} className={'form-control-container'}
											options={options}
										/>
										<div hidden={!isFieldError} className="form-feedback-text select-feedback">Username is required</div>
									</FormGroup>
								</Col>
								<Col md={12}>
									<FormGroup>
										<Label for="requestDate">Requester Name</Label>
										<Input invalid type="text" name="requester_name" id="requester_name" onChange={self.onHandleChange} placeholder="Enter Requester Name" />
										<FormFeedback className={"form-feedback-text"}>Requester name is required</FormFeedback>
									</FormGroup>
								</Col>
								<Col md={12}>
									<FormGroup>
										<Label for="requestDate">Request Date</Label>
										<p>asdfasdfsdfsafasf</p>
									</FormGroup>
								</Col>
								<Col md={12}>
									<FormGroup>
										<Label for="requestDate">Content Name</Label>
										<Input type="text" name="content_name" id="content_name" onChange={self.onHandleChange} placeholder="Search" />
									</FormGroup>
								</Col>
							</Row>
						</Col>
						{/* <Col lg={7} md={12}>
							<Row form>
								<Col md={12}>
									<FormGroup>
										<Label for="search_admin">Song Name</Label>
										<Input type="text" name="search_admin" id="search_admin" onChange={self.onHandleChange} placeholder="Search" />
									</FormGroup>
								</Col>
							</Row>
						</Col> */}
						{/* <Col lg={3} md={6}>
                            <FormGroup>
                                <Label for="search_admin">Search</Label>
                                <Input type="text" name="search_admin" id="search_admin" onChange={self.onHandleChange} placeholder="Search" />
                            </FormGroup>
                        </Col>
                        <Col lg={3} md={6}>
                            <FormGroup>
                                <Label for="stepchart_type">Stepchart Types</Label>
                                <Input type="select" name="stepchart_type" id="stepchart_type" onChange={self.onStepchartTypeChanged}>
                                   
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col lg={3} md={6}>
                            <FormGroup>
                                <Label for="stepchart_level">Stepchart Levels</Label>
                                <Input type="select" name="stepchart_level" id="stepchart_level" onChange={self.onHandleChange}>
                                  
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col lg={3} md={6}>
                            <FormGroup>
                                <Label for="status">Status</Label>
                                <Input type="select" name="status" id="status" onChange={self.onHandleChange}>
                                   
                                </Input>
                            </FormGroup>
                        </Col> */}
					</Row>
					{/* <Button color="primary" type='submit'>Save</Button> */}
				</Form>
			</Container>
		);
	}
}

export default withRouter(RequestEdit);