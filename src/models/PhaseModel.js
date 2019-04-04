import {observable} from 'mobx';
export  default  class PhaseModel
{
	_store;
	_id;
	@observable _position;
	@observable _name;
	@observable _duration;

	constructor(store,id,position,name,duration)
	{
		this._store = store;
		this._id = id;
		this._position = position;
		this._name = name;
		this._duration = duration;
	}
	destory()
	{
		this._store._phases.remove(this);
	}
	toJS() {
		return {
			id: this._id,
			position: this._position,
			name: this._name,
			duration:this._duration
		};
	}
	static  fromJS(store,object)
	{
		return new PhaseModel(store,object.id, object.position, object.name,object.duration);
	}

}