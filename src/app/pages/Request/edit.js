import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	Table, Badge, Container, Button,
	Form, FormGroup, FormText, FormFeedback,
	Input, Label, Row, Col, Alert,
	Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { push } from 'react-router-redux';
import 'ckeditor';
// import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select';
import { fetchCommonData, fetchStepchartLevels } from '../../actions/Common/commonActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cancelAllPendingRequests } from '../../helpers/axios-cancellation';
import { isFormValid } from '../../helpers/form-validator';
import { fetchRequestItem, clearRequestItem } from '../../actions/Request/requestActions';
import store from '../../configureStore';
import { AppLoader } from '../../component/Loader/AppLoader';

const formConstraints = {
	song: {
		presence: {
			message: 'Song is required',
			allowEmpty: false
		},
	},
	requester: {
		presence: {
			message: 'Requester name is required',
			allowEmpty: false
		},
	},
	stepchart_type: {
		presence: {
			message: 'Stepchart type is required',
			allowEmpty: false
		},
	},
	stepchart_level: {
		presence: {
			message: 'Stepchart level is required',
			allowEmpty: false
		},
	},
	stepmaker: {
		presence: {
			message: 'Stepmaker is required',
			allowEmpty: false
		},
	},
	status: {
		presence: {
			message: 'Status is required',
			allowEmpty: false
		},
	},
	ucs_link: {
		presence: {
			message: 'UCS download link is required',
			allowEmpty: false
		},
		url: {
			message: 'UCS download link is not valid'
		}
	}
};

const members = [
	{ value: 'ZHAOYUN', label: 'ZHAOYUN' },
	{ value: 'DRBOX', label: 'DRBOX'},
	{ value: 'NUMBUH_1', label: 'NUMBUH_1' },
	{ value: 'CONCEC', label: 'CONCEC' },
];

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

const buttonStyles = {
	marginTop: '10px',
	marginBottom: '20px'
}

const textAreaStyles = {
	width: '100%'
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
	constructor(props) {
		super(props);
		this.state = {
			formValue: {
				song: null,
				requester: null
			},
			formErrors: {
				song: null
			}
		}
	}

	componentDidMount() {
		console.log('Request Edit Mounted');
		const self = this;

		const {
			stepchartTypeItems, stepchartLevelItems, statusItems, songItems,
			fetchCommonData, fetchStepchartLevels, editedRequest, fetchRequestItem
		} = self.props;

		if (!stepchartTypeItems || !statusItems || !songItems) {
			fetchCommonData();
		}

		if (!stepchartLevelItems) {
			fetchStepchartLevels();
		}

		if (!editedRequest) {
			const id = this.props.match.params.id;
			fetchRequestItem(id);
		}
	}

	manipulateRequestData(item) {
		const self = this;
		const { ucs_link, stepchart_info, song, song_name, status, requester_note, custom_note, content_name, stepmaker, requester } = item;

		self.setState({
			formValue: {
				ucs_link: ucs_link,
				status: status.value,
				stepchart_type: stepchart_info.stepchart_type_value,
				stepchart_level: stepchart_info.stepchart_level,
				requester: requester,
				stepmaker: stepmaker,
				requester_note: requester_note ? requester_note : '',
				custom_note: custom_note ? custom_note : '',
				content_name: content_name ? content_name : '',
				song: song
			},
		});

		self.props.songItems.map(categoryItem => {
			const categoryOptions = categoryItem.options;

			var foundItem = categoryOptions.find(function (item) {
				return item.value === song;
			})

			if (foundItem) {
				self.setState({
					selectedSong: foundItem ? { label: foundItem.label, value: foundItem.value, artist: foundItem.artist } : undefined,
				})
			}
		});
	}

	componentWillUnmount() {
		cancelAllPendingRequests();
		this.props.clearRequestItem();
		for (name in CKEDITOR.instances) {
			CKEDITOR.instances[name].destroy();
		}
	}

	componentDidUpdate() {
		const self = this;
		const { editedRequest, isCommonLoading, isRequestItemFetching } = self.props;
		if (editedRequest && !isCommonLoading && !isRequestItemFetching && !self.state.isLoaded) {
			this.manipulateRequestData(this.props.editedRequest);

			setTimeout(function () {
				const { formValue } = self.state;
				const bindInput = ['requester_note', 'custom_note', 'requester',
					'stepmaker', 'stepchart_type', 'stepchart_level',
					'ucs_link', 'status'
				];
				bindInput.forEach(item => {
					if (formValue[item]) {
						document.getElementById(item).value = formValue[item];
					}
				});

				CKEDITOR.replace('requester_note', {
					on: {
						change: function (evt) {
							let data = evt.editor.getData();
							self.onTextAreaChanged('requester_note', data);
						},
						instanceReady: function (evt) {
							console.log('requester_note instance ready');
							self.setState({
								isRequesterNoteReady: true
							})
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
							console.log('custom_note instance ready');
							self.setState({
								isCustomNoteReady: true
							})
						}
					}
				});

			}, 2000);

			self.setState({
				isLoaded: true
			})

		}
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
		let newState = Object.assign({}, self.state.formValue, {
			[inputName]: e.value ? e.value : null
		});

		self.setState({
			formValue: newState,
			selectedSong: e
		});

		console.log('Selected');
		console.log(e);

		if (self.state.isFormSubmit) {
			setTimeout(function () {
				isFormValid(self.state.formValue, formConstraints, self);
			}, 1);
		}
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

	onPlayerChanged = (e) => {
		console.log('Player Changed');
		console.log(e);
	}

	backToRequestPage = () => {
		store.dispatch(push('/request'));
	}

	render() {
		const self = this;
		const { formErrors, selectedSong, isCustomNoteReady, isRequesterNoteReady, formValue } = self.state;
		const { songItems, stepchartTypeItems, statusItems, stepchartLevelItems, isRequestItemFetching, isCommonLoading, editedRequest } = self.props;

		const dateOptions = {
			weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZoneName: 'short',
			hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false,
		}

		return (
			<Container fluid>
				<h1 className='text-center section-header'>Request Edit Page</h1>
				{/* <div hidden={!isCommonLoading && !isRequestItemFetching && isCustomNoteReady && isRequesterNoteReady} className="overlay-div">
					<FontAwesomeIcon className="spin-big overlay-loader" icon="spinner" spin />
				</div> */}

				<AppLoader hidden={!isCommonLoading && !isRequestItemFetching && isCustomNoteReady && isRequesterNoteReady} />
				<Form onSubmit={self.onSubmit}>
					<Row>
						<Col lg={5} md={12}>
							<Row form>
								<Col md={12}>
									<FormGroup>
										<Label for="song"><FontAwesomeIcon className={'b-fa-logo'} icon="music" /> Song Name</Label>
										{/* <Select onChange={(e) => self.onSelectChange(e, 'song_name')} classNamePrefix={isFieldError ? 'form-control-invalid' : 'form-control'} className={'form-control-container'}
											options={options}
										/> */}
										<Select value={selectedSong} onChange={(e) => self.onSelectChange(e, 'song')} classNamePrefix={formErrors && formErrors.song ? 'form-control-invalid' : 'form-control'} className={'form-control-container'}
											options={songItems} formatGroupLabel={formatGroupLabel} formatOptionLabel={formatOptionLabel}
										/>
										<div hidden={formErrors && !formErrors.song ? true : false} className="form-feedback-text select-feedback">{formErrors && formErrors.song ? formErrors.song.errorMessage : null}</div>
									</FormGroup>
								</Col>
								<Col md={12}>
									<FormGroup>
										<Label for="requester"><FontAwesomeIcon className={'b-fa-logo'} icon="user" /> Requester Name</Label>
										<Input invalid={formErrors && formErrors.requester ? true : false} type="text" name="requester" id="requester" onChange={self.onHandleChange} placeholder="Enter Requester Name" />
										<FormFeedback className={"form-feedback-text"}>{formErrors && formErrors.requester ? formErrors.requester.errorMessage : null}</FormFeedback>
									</FormGroup>
								</Col>
								<Col md={12}>
									<FormGroup>
										<Label for="requestDate"><FontAwesomeIcon className={'b-fa-logo'} icon="calendar-alt" /> Request Date</Label>
										<p>{editedRequest ? (new Intl.DateTimeFormat('en-US', dateOptions).format(new Date(editedRequest.request_date))) : null}</p>
									</FormGroup>
								</Col>
								<Col md={12}>
									<FormGroup>
										<Label for="content_name">Content Name</Label>
										<Input type="text" name="content_name" id="content_name" onChange={self.onHandleChange} placeholder="Enter content name" />
									</FormGroup>
								</Col>
								<Col lg={6} md={6}>
									<FormGroup>
										<Label for="stepchart_type">Stepchart Types</Label>
										<Input invalid={formErrors && formErrors.stepchart_type ? true : false} type="select" name="stepchart_type" id="stepchart_type" onChange={self.onStepchartTypeChanged}>
											{
												stepchartTypeItems ? stepchartTypeItems.map((item, index) => {
													return <option key={index} value={item.value}>{item.title}</option>
												}) : null
											}
										</Input>
										<FormFeedback className={"form-feedback-text"}>{formErrors && formErrors.stepchart_type ? formErrors.stepchart_type.errorMessage : null}</FormFeedback>
									</FormGroup>
								</Col>
								<Col lg={6} md={6}>
									<FormGroup>
										<Label for="stepchart_level">Stepchart Levels</Label>
										<Input invalid={formErrors && formErrors.stepchart_level ? true : false} type="select" name="stepchart_level" id="stepchart_level" onChange={self.onHandleChange}>
											{
												stepchartLevelItems ? stepchartLevelItems.map(item => {
													return <option key={item.value} value={item.value}>{item.title}</option>
												}) : null
											}
										</Input>
										<FormFeedback className={"form-feedback-text"}>{formErrors && formErrors.stepchart_level ? formErrors.stepchart_level.errorMessage : null}</FormFeedback>
									</FormGroup>
								</Col>
								<Col md={12}>
									<FormGroup>
										<Label for="stepmaker"><FontAwesomeIcon className={'b-fa-logo'} icon="user-shield" /> Stepmaker</Label>
										<Input invalid={formErrors && formErrors.stepmaker ? true : false} type="text" name="stepmaker" id="stepmaker" onChange={self.onHandleChange} placeholder="Enter stepmaker name" />
										<FormFeedback className={"form-feedback-text"}>{formErrors && formErrors.stepmaker ? formErrors.stepmaker.errorMessage : null}</FormFeedback>
									</FormGroup>
								</Col>
								<Col md={12}>
									<FormGroup>
										<Label for="ucs_link"><FontAwesomeIcon className={'b-fa-logo'} icon="download" /> Url Download Link</Label>
										<Input invalid={formErrors && formErrors.ucs_link ? true : false} type="text" name="ucs_link" id="ucs_link" onChange={self.onHandleChange} placeholder="Enter UCS Download Link" />
										<FormFeedback className={"form-feedback-text"}>{formErrors && formErrors.ucs_link ? formErrors.ucs_link.errorMessage : null}</FormFeedback>
									</FormGroup>
								</Col>
								<Col md={12}>
									<FormGroup>
										<Label for="status"><FontAwesomeIcon className={'b-fa-logo'} icon="stamp" /> Status</Label>
										<Input invalid={formErrors && formErrors.status ? true : false} type="select" name="status" id="status" onChange={self.onHandleChange}>
											{
												statusItems ? statusItems.map(item => {
													return <option key={item.value} value={item.value}>{item.title}</option>
												}) : null
											}
										</Input>
										<FormFeedback className={"form-feedback-text"}>{formErrors && formErrors.status ? formErrors.status.errorMessage : null}</FormFeedback>
									</FormGroup>
								</Col>
								<Col md={12}>
									<FormGroup>
										<Label for="played_by"><FontAwesomeIcon className={'b-fa-logo'} icon="users" /> Played By</Label>
										<Select isMulti options={members} onChange={self.onPlayerChanged}/>
										<div hidden={formErrors && !formErrors.played_by ? true : false} className="form-feedback-text select-feedback">{formErrors && formErrors.played_by ? formErrors.played_by.errorMessage : null}</div>
									</FormGroup>
								</Col>
							</Row>
						</Col>
						<Col lg={7} md={12}>
							<Row form>
								<Col md={12}>
									<FormGroup>
										<Label for="requester_note"><FontAwesomeIcon className={'b-fa-logo'} icon="sticky-note" /> Requester Note</Label>
										<textarea name="requester_note" id="requester_note" rows="10" cols="80" style={textAreaStyles}>
										</textarea>
									</FormGroup>
								</Col>
								<Col md={12}>
									<FormGroup>
										<Label for="custom_note"><FontAwesomeIcon className={'b-fa-logo'} icon="sticky-note" /> Custom Note</Label>
										<textarea name="custom_note" id="custom_note" rows="10" cols="80" style={textAreaStyles}>
										</textarea>
									</FormGroup>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row>
						<Col className={'d-flex justify-content-center align-content-center'} lg={4} md={4} style={buttonStyles}>
							<Button color="primary" block type='submit'><FontAwesomeIcon className={'b-fa-logo'} icon="save" /> Save</Button>
						</Col>
						<Col className={'d-flex justify-content-center align-content-center'} lg={4} md={4} style={buttonStyles}>
							<Button color="success" block type='button'><FontAwesomeIcon className={'b-fa-logo'} icon="save" /> Youtube Description</Button>
						</Col>
						<Col className={'d-flex justify-content-center align-content-center'} lg={4} md={4} style={buttonStyles}>
							<Button color="danger" block type='button' onClick={self.backToRequestPage}><FontAwesomeIcon className={'b-fa-logo'} icon="arrow-left" /> Back</Button>
						</Col>
					</Row>
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
	isRequestItemFetching: state.request.isRequestItemFetching,
	editedRequest: state.request.editedRequest
})

const mapDispatchToProps = (dispatch) => {
	return {
		fetchCommonData: () => {
			dispatch(fetchCommonData());
		},
		fetchStepchartLevels: (stepchartType = '') => {
			dispatch(fetchStepchartLevels(stepchartType));
		},
		fetchRequestItem: (id) => {
			dispatch(fetchRequestItem(id));
		},
		clearRequestItem: () => {
			dispatch(clearRequestItem());
		}
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RequestEdit))

// export default withRouter(RequestEdit);