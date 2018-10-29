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
	constructor(props) {
		super(props);
		this.state = {
			selectedOption: null,
		}
	}

	componentDidMount() {
		console.log('Request Edit Mounted');
	}

	render() {
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
										<Select classNamePrefix={'react-select'} className={'react-select-container'}
											value={this.state.selectedOption}
											options={options}
										/>
									</FormGroup>
								</Col>
								<Col md={12}>
									<FormGroup>
										<Label for="requestDate">Requester Name</Label>
										<Input type="text" name="song_name" id="song_name" onChange={self.onHandleChange} placeholder="Search" />
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
										<Input type="text" name="song_name" id="song_name" onChange={self.onHandleChange} placeholder="Search" />
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