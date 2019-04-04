import {observable} from 'mobx';
export  default  class StepModel {
	_store;
	_id;
	@observable _position;
	@observable _name;
	@observable _description;
	@observable _phaseownid;
	constructor(store,id,position,name,description,phaseownid)
	{
		this._store = store;
		this._id = id;
		this._position = position;
		this._name = name;
		this._description = description;
		this._phaseownid = phaseownid;
	}
	destory()
	{
		this._store._steps.remove(this);
	}
	toJS() {
		return {
			id: this._id,
			postion: this._position,
			name: this._name,
			description:this._description
		};
	}
	static  fromJS(store,object)
	{
		return new StepModel(store,object.id, object.position, object.name,object.description,object.phaseownid);
	}
}