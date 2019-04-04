import React, { Component } from 'react';
import  '../../css/stepview.scss';
import {Button, ListGroup,Row,Col} from	 'react-bootstrap'
import {inject, observer} from "mobx-react/index";
import StepModal from './StepModal';

@inject("StructStore")
@observer
class StepView extends Component {
	_stepSelectClick = (step)=>{
		this.props.StructStore._stepstore._setCurrentSelectStep(step);
	}
	_stepAdd =()=>
	{
		let stepstore = this.props.StructStore._stepstore;
		stepstore._setStepModalValue(null);
	}
  render() {
		let showStep = this.props.StructStore._getShowSteps;
		let stepstore =  this.props.StructStore._stepstore;
    return (
      <div>
				<div class="row">
				  <h3>步骤{`${this.props.StructStore._phasestore._getCurrentSelectPhase() ? ':' + this.props.StructStore._phasestore._getCurrentSelectPhase()._name:""}`}</h3>
					<Button variant="outline-primary" onClick={this._stepAdd}>Add</Button>
				</div>
				<div>
					{
						showStep && showStep.length > 0 ? (
							<ListGroup>
								{
									showStep.map(item => {
										return (
											<ListGroup.Item onClick={() => this._stepSelectClick(item)} variant="light"
																			className={`stemviewlistitemContainer ${stepstore._getCurrentSelectStep() && (stepstore._getCurrentSelectStep()._id === item._id)? "active":""}`} inline
																			class="list-inline-item"
											>
												<Row>
													<Col>
														<span>{item._position}</span>
													</Col>
													<Col>
														<span>{item._name}</span>
													</Col>
													<Col>
														<span>{item._description}</span>
													</Col>
												</Row>

											</ListGroup.Item>
										)
									})
								}
							</ListGroup>
						):null
					}
				</div>
				<StepModal></StepModal>
			</div>
    );
  }
}

export default StepView;

