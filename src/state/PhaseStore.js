import {observable,action,computed} from 'mobx';
import UUID from 'uuid/v4';
import PhaseModel from "../models/PhaseModel";
import _ from "lodash";

class  PhaseStore {
	@observable _phases = [];
	@observable _currentSelectPhase;
	@observable _phaseModalVisible = false;
	@observable _phaseInitValue;

	@action
	addPhase(phaseJson)
	{
		let phasheObject = new PhaseModel(this, UUID(), phaseJson.position, phaseJson.name,phaseJson.duration);
		if(this._phases && this._phases.length>0)
		{
			let findexits = this._phases.findIndex(item => item.name === phaseJson.name);
			if(findexits  !== -1)
			{
				 return;
			}
			//console.log(phasheObject);
			this._phases.splice(phaseJson.position === 0? 0: phaseJson.position, 0, phasheObject); //在指定位置插入step
			this._phases.map((item,index)=>{
				item._position= index;
			})
		}
		else
		{
			this._phases.push(phasheObject); //在指定位置插入step
			//重新编号
			this._phases.map((item,index)=>{
				item._id= index;
			})
		}
	}
	@action
	updatePhase(phase)
	{
		let oldPhase = this._phases.findIndex(item => item._id === phase._id);
		console.log(`${JSON.stringify(oldPhase) } ${phase._position}`);
		if(oldPhase !== -1)
		{
			this._phases.splice(oldPhase,1);
			this._phases.splice(phase._position, 0, phase);

		}
	}
	@action
	_setCurrentSelectPhase(phase)
	{
		if(!_.isEqual(this._currentSelectPhase, phase))
		{
			this._currentSelectPhase = _.cloneDeep(phase);
		}
	}
	_getCurrentSelectPhase()
	{
		if(this._currentSelectPhase)
			return this._currentSelectPhase;
		else
			return null;
	}
	@action
	_setPhaseModalValue = (initValue)=>{
		this._phaseInitValue = initValue;
		this._phaseModalVisible = true;
	}
	@computed
	get _getPhaseInitValue()
	{
		return this._phaseInitValue;
	}

	toJS() {
		return this._phases.map(item => item.toJS());
	}
	static fromJS(array) {
		const phaseStore = new PhaseStore();
		phaseStore._phases = array.map(item => PhaseModel.fromJS(phaseStore, item));
		return phaseStore;
	}
	getPhasesSelect()
	{
		let posSelect = [];
		let i = 0;
		posSelect.push({pos:0, label:'最上面'});
		if(!this._phases || this._phases.length === 0)
		{
			return posSelect;
		}
		else
		{
			this._phases.map((item,index)=>{
				posSelect.push({pos:index + 1, label:`${item._name}之后`})
			});
			return posSelect;
		}
	}
	_getPhaseByID(name)
	{
		if(this._phases && this._phases.length > 0)
		{
			let findindex = this._phases.findIndex(item => item._name === name);
			if(findindex !== -1)
			{
				return this._phases[findindex];
			}
		}
	}
}

export default  PhaseStore;