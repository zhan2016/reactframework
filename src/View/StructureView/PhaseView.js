import React from 'react';
import {ListGroup,Button,Dropdown} from 'react-bootstrap';
import {inject,observer} from 'mobx-react';
import '../../css/phaseview.scss';
import  PhaseModal from './PhaseModal';

@inject("StructStore")
@observer
class  PhaseView extends  React.Component{
	_editPhaseClick =(phase)=>{
		let phaseStore = this.props.StructStore._phasestore;
		phaseStore._setCurrentSelectPhase(phase);
	};
	_deletePhase = ()=>{
		console.log(`删除组?`);
	}

	_phaseAdd = ()=>{
		let phaseStore = this.props.StructStore._phasestore;
		phaseStore._setPhaseModalValue(null);
	}
	render()
	{
		let phaseStore = this.props.StructStore._phasestore;
		return (
			<div>
				<div className={"lefttoolbar"}>
					<div className={"lefttoolbarcontent"}>
					<span>组</span>
					<Button variant="outline-primary" onClick={this._phaseAdd}>添加</Button>
					</div>
				</div>
				{phaseStore._phases && phaseStore._phases.length > 0 ?(
					<ListGroup>
						{
							phaseStore._phases.map(item=>{
								return (<ListGroup.Item onClick={() => this._editPhaseClick(item)} variant="light"
																				className={`phaseviewlistitemContainer ${phaseStore._getCurrentSelectPhase() && (phaseStore._getCurrentSelectPhase()._id === item._id)? "active":""}`} inline
																				class="list-inline-item"
								>
									<div class="span6" className={"phasename"}>
										 {item._name}
									</div>
									<div class="span6 pull-right" className={"phaseoperator"}>
										<Dropdown>
											<Dropdown.Toggle variant="success" id="dropdown-basic">
												操作
											</Dropdown.Toggle>
											<Dropdown.Menu>
												<Dropdown.Item href="#/action-1" onClick = {()=>{phaseStore._setPhaseModalValue(item)}}>编辑</Dropdown.Item>
												<Dropdown.Item href="#/action-2" onClick={()=>{this._deletePhase(item)}}>删除</Dropdown.Item>
												<Dropdown.Item href="#/action-3">打印</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
									</div>
								</ListGroup.Item>)
							})
						}
					</ListGroup>
				):null}
				<PhaseModal/>
			</div>
		)
	}
}

export default  PhaseView;