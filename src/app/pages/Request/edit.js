import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	Table, Badge, Container, Button,
	Form, FormGroup, FormText, FormFeedback,
	Input, Label, Row, Col, Alert,
	Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import 'ckeditor';
// import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select';
import { fetchCommonData, fetchStepchartLevels } from '../../actions/Common/commonActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cancelAllPendingRequests } from '../../helpers/axios-cancellation';
import { isFormValid } from '../../helpers/form-validator';

const formConstraints = {
	song_name: {
		presence: {
			message: 'Song is required',
			allowEmpty: false
		},
	},
	requester_name: {
		presence: {
			message: 'Requester name is required',
			allowEmpty: false
		},
	}
};

const groupStyles = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
};
const groupBadgeStyles = {
	backgroundColor: '#EBECF0',
	borderRadius: '2em',
	color: '#172B4D',
	display: 'inline-block',
	fontSize: 12,
	fontWeight: 'normal',
	lineHeight: '1',
	minWidth: 1,
	padding: '0.16666666666667em 0.5em',
	textAlign: 'center',
};

const optionDiv = {
	marginBottom: '-15px',
	whiteSpace: 'normal'
}

const formatGroupLabel = data => (
	<div style={groupStyles}>
		<span>{data.label}</span>
		<span style={groupBadgeStyles}>{data.options.length}</span>
	</div>
);

const formatOptionLabel = data => (
	<div style={optionDiv}>
		<strong>{data.label}</strong>
		<p>Artist: {data.artist}</p>
	</div>
)

class RequestEdit extends Component {
	state = {
		formValue: {
			song_name: null,
			requester_name: null
		},
		formErrors: {
			song_name: null
		}
	}

	componentDidMount() {
		console.log('Request Edit Mounted');
		const self = this;
		const { stepchartTypeItems, statusItems, fetchCommonData, fetchStepchartLevels, songItems } = this.props;

		if (!stepchartTypeItems || !statusItems || !songItems) {
			fetchCommonData();
		}

		CKEDITOR.replace('requester_note', {
			on: {
				change: function (evt) {
					let data = evt.editor.getData();
					self.onTextAreaChanged('requester_note', data);
				},
				instanceReady: function (evt) {
				}
			}
		});

		CKEDITOR.replace('custom_note', {
			on: {
				change: function (evt) {
					let data = evt.editor.getData();
					self.onTextAreaChanged('custom_note', data);
				},
				instanceReady: function (evt) {
				}
			}
		});

	}

	componentWillUnmount() {
		cancelAllPendingRequests();
	}

	onHandleChange = (e) => {
		const self = this;
		let newState = Object.assign({}, self.state.formValue, {
			[e.target.name]: e.target.value
		});

		self.setState({
			formValue: newState
		});

		if (self.state.isFormSubmit) {
			setTimeout(function () {
				isFormValid(self.state.formValue, formConstraints, self);
				console.log(self.state);
			}, 1);
		}
	}

	onTextAreaChanged = (inputName, data) => {
		const self = this;

		let newState = Object.assign({}, self.state.formValue, {
			[inputName]: data
		});

		self.setState({
			formValue: newState
		});

		console.log(self.state.formValue);
	}

	onSelectChange(e, inputName) {
		const self = this;
		console.log(inputName);
		let newState = Object.assign({}, self.state.formValue, {
			[inputName]: e.value ? e.value : null
		});

		self.setState({
			formValue: newState
		});

		if (self.state.isFormSubmit) {
			setTimeout(function () {
				isFormValid(self.state.formValue, formConstraints, self);
				console.log(self.state);
			}, 1);
		}
	}

	onSubmit = (e) => {
		e.preventDefault();
		const self = this;
		const formValue = self.state.formValue;

		self.setState({
			isFormSubmit: true
		})

		if (isFormValid(formValue, formConstraints, self)) {
			console.log('Valid');
		}
	}

	render() {
		const isFieldError = false;
		const self = this;
		const { formErrors, formValue } = self.state;
		const { songItems , stepchartTypeItems } = self.props;
		return (
			<Container fluid>
				<h1 className='text-center section-header'>Request Edit Page</h1>
				<Form onSubmit={self.onSubmit}>
					<Row>
						<Col lg={5} md={12}>
							<Row form>
								<Col md={12}>
									<FormGroup>
										<Label for="song_name">Song Name</Label>
										{/* <Select onChange={(e) => self.onSelectChange(e, 'song_name')} classNamePrefix={isFieldError ? 'form-control-invalid' : 'form-control'} className={'form-control-container'}
											options={options}
										/> */}
										<Select onChange={(e) => self.onSelectChange(e, 'song_name')} classNamePrefix={formErrors && formErrors.song_name ? 'form-control-invalid' : 'form-control'} className={'form-control-container'}
											options={songItems} formatGroupLabel={formatGroupLabel} formatOptionLabel={formatOptionLabel}
										/>

										<div hidden={formErrors && !formErrors.song_name ? true : false} className="form-feedback-text select-feedback">{formErrors && formErrors.song_name ? formErrors.song_name.errorMessage : null}</div>
									</FormGroup>
								</Col>
								<Col md={12}>
									<FormGroup>
										<Label for="requestDate">Requester Name</Label>
										<Input invalid={formErrors && formErrors.requester_name ? true : false} type="text" name="requester_name" id="requester_name" onChange={self.onHandleChange} placeholder="Enter Requester Name" />
										<FormFeedback className={"form-feedback-text"}>{formErrors && formErrors.requester_name ? formErrors.requester_name.errorMessage : null}</FormFeedback>
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
								<Col lg={6} md={6}>
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
								<Col lg={6} md={6}>
									<FormGroup>
										<Label for="stepchart_level">Stepchart Levels</Label>
										<Input type="select" name="stepchart_level" id="stepchart_level" onChange={self.onHandleChange}>
											{/* {
												stepchartLevelItems ? stepchartLevelItems.map(item => {
													return <option key={item.value} value={item.value}>{item.title}</option>
												}) : null
											} */}
										</Input>
									</FormGroup>
								</Col>
							</Row>
						</Col>
						<Col lg={7} md={12}>
							<Row form>
								<Col md={12}>
									<FormGroup>
										<Label for="requester_note">Requester Note</Label>
										<textarea name="requester_note" id="requester_note" rows="10" cols="80" defaultValue={'This is my textarea to be replaced with CKEditor.'}>
										</textarea>
									</FormGroup>
								</Col>
								<Col md={12}>
									<FormGroup>
										<Label for="custom_note">Custom Note</Label>
										<textarea name="custom_note" id="custom_note" rows="10" cols="80" defaultValue={'This is custom note'}>
										</textarea>
									</FormGroup>
								</Col>
							</Row>
						</Col>
					</Row>
					<Button color="primary" type='submit'>Save</Button>
				</Form>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	stepchartLevelItems: state.common.stepchartLevelItems,
	stepchartTypeItems: state.common.stepchartTypeItems,
	songItems: state.common.songItems,
	statusItems: state.common.statusItems,
	isCommonLoading: state.common.isLoading,
	requestResult: state.request.requestResult,
})

const mapDispatchToProps = (dispatch) => {
	return {
		fetchCommonData: () => {
			dispatch(fetchCommonData());
		},
		fetchStepchartLevels: (stepchartType = '') => {
			dispatch(fetchStepchartLevels(stepchartType));
		}
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RequestEdit))

// export default withRouter(RequestEdit);