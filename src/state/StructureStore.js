import {observable,action,computed} from 'mobx';
import StepStore from "./StepStore";
import PhaseStore  from './PhaseStore';
import _ from 'lodash'


class  StructureStore {
	constructor()
	{
		this._phasestore = new 	PhaseStore();
		this._stepstore = new StepStore();
		this._phasestore.addPhase({position:0, name:'测试',duration:'11'});
		this._stepstore.addStep({position:0, name:'步骤一', description:'步骤一',phaseownid:'测试'})
	}
	@computed
	get _getShowSteps()
	{
		if(!this._phasestore._currentSelectPhase || !this._stepstore._steps)
		{
			return [];
		}
		else {
			let steps = [];
			console.log(`${this._phasestore._currentSelectPhase._name}`);
			this._stepstore._steps.map(item => {
					if (item._phaseownid === this._phasestore._currentSelectPhase._name) {
						steps.push((item));
					}
				}
			);
			return steps;
		}
	}

	_getStartIndexofInitPhase = (phase)=>
	{
			let phasestore = this._phasestore;
			if(!phasestore._phases || phasestore._phases.length === 0)
			{
				return 0;
			}
			else
			{
				let index = 0;
				let phaseindex = phasestore._phases.findIndex(item => item._id === phase._id);
				if(phaseindex === -1)
				{
					return 0;
				}
				for (let i = 0; i < phaseindex; i++)
				{
					let phaseName = phasestore._phases[i]._name;
					this._stepstore._steps.map(item => {
						if(item._phaseownid === phaseName)
						{
							index++;
						}
					})
				}
				return index;
			}
	}

	_getStepsSelect4phase()
	{
		let selects = [];
		if(!this._phasestore._currentSelectPhase)
		{
			return null;
		}
		let steps = this._stepstore._steps;
		if(!steps || steps.length === 0)
		{
			//当前还没有任何步骤
			return [{label:`${this._phasestore._currentSelectPhase._name}-最上面`,pos:0}]
		}
		let stepindex = this._stepstore._steps.findIndex(item => item._phaseownid === this._phasestore._currentSelectPhase._name);
		if(stepindex === -1)
		{
			//当前组还没有步骤
			//console.log(`当前还没有步骤:${this._phasestore._currentSelectPhase._name}-最上面 ${this._getStartIndexofInitPhase(this._phasestore._currentSelectPhase)}`)
			return [{label:`${this._phasestore._currentSelectPhase._name}-最上面`,pos:this._getStartIndexofInitPhase(this._phasestore._currentSelectPhase)}]
		}
		else
		{
			let steps = [];
			this._stepstore._steps.map(item => {
					if (item._phaseownid === this._phasestore._currentSelectPhase._name) {
						steps.push({label:`${item._phaseownid}-${item._name}之后`,pos:item._position + 1});
					}
				}
			);
			let posStartIndex = steps[0].pos - 1;
			steps.splice(0, 0, {label:`${this._phasestore._currentSelectPhase._name}-最上面`,pos:posStartIndex});
			return steps;
		}
	}
 _getStepsSelectAll()
	{
		let steps = this._stepstore._steps;
		let phases = this._phasestore._phases;
		if(!phases || phases.length === 0)
		{
			return [];
		}

		if(!steps || steps.length === 0) {
			return null;
		}
		let showselect = [];
		showselect.push({label:`${this._phasestore._phases[0]._name}-最上面`, pos:0});
		steps.map((item,index) =>{
			showselect.push({label:`${item._phaseownid}-${item._name}后面`, pos:index + 1})
		})
		return showselect;
	}
	_constructor
}

export  default  StructureStore;