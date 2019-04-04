import {observable, computed, reaction, action} from 'mobx';
import StepModel from '../models/StepModel';
import UUID from 'uuid/v4';
import _ from "lodash";
import PhaseModel from "../models/PhaseModel";

class  StepStore {

	@observable _steps = [];
	@action
	addStep(stepJson)
	{
		//获取所属的组
		console.log(`${JSON.stringify(stepJson)}`);
		let stepObject = new StepModel(this, UUID(), stepJson.position, stepJson.name,stepJson.description,stepJson.phaseownid);

		if(this._steps && this._steps.length>0)
		{
			//console.log(phasheObject);
			this._steps.splice(stepJson.position === 0? 0: stepJson.position, 0, stepObject); //在指定位置插入step
			this._steps.map((item,index)=>{
				item._position= index;
			})
		}
		else
		{
			this._steps.push(stepObject); //在指定位置插入step
			//重新编号
			this._steps.map((item,index)=>{
				item._position= index;
			})
		}

	}
	@action
	updateStep(step)
	{
		let oldStep = this._steps.findIndex(item => item._id = step._id);
		if(oldStep)
		{
			this._steps.splice(oldStep,1);
			this._steps.splice(step._position, 0, step);
		}
	}
	
	toJS() {
		return this._steps.map(item => item.toJS());
	}
	static fromJS(array) {
		const stepStore = new StepStore();
		stepStore._steps = array.map(item => StepModel.fromJS(stepStore, item));
		return stepStore;
	}


	@observable _stepModalVisible = false;
	@observable _currentSelectStep;
	@observable _stepInitValue;
	@action
	_setCurrentSelectStep(step)
	{
		if(!_.isEqual(this._currentSelectStep, step))
		{
			this._currentSelectStep = _.cloneDeep(step);
		}
	}
	_getCurrentSelectStep()
	{
		if(this._currentSelectStep)
			return this._currentSelectStep;
		else
			return null;
	}
	@action
	_setStepModalValue = (initValue)=>{
		this._stepInitValue = initValue;
		this._stepModalVisible = true;
	}
	@computed
	get _getStepInitValue()
	{
		return this._stepInitValue;
	}

}

export  default  StepStore;