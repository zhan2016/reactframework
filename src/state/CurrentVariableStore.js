//代表当前选中或者操作的系列变量
import {observable,action,computed} from 'mobx';
import _ from 'lodash'
import {getStudyFormList} from "../axios/FormAPI";
import {getRecordFormList} from "../axios/RecordAPI";



class CurrentVariableStore
{
	@observable _currentStudyid = "";
	@observable _currentFormId = "";
	@observable _formList = [];
	@observable _recordList = [];
	@action setCurrentStudyId(studyid)
	{
		if(studyid && studyid !== "" && studyid !== this._currentStudyid)
		{
			this._currentStudyid = studyid;
			getStudyFormList({studyid:this._currentStudyid}).then((data)=>{
				if(!_.isEqual(this._formList, data))
				{
					//console.log(`获取到了表单列表吧:${JSON.stringify(data)}`);
					this._formList = _.cloneDeep(data);
				}
			})
			getRecordFormList({studyid:this._currentStudyid}).then((data)=>{
				if(!_.isEqual(this._recordList, data))
				{
					//console.log(`获取到了表单列表吧:${JSON.stringify(data)}`);
					this._recordList = _.cloneDeep(data);
				}
			})
		}
	}
	@computed
	get _getFormList()
	{
		return this._formList;
	}
	@computed
	get getCurrentStudyId()
	{
		return this._currentStudyid;
	}

	@action
	updateWithPosChange(oldform, newform)
	{
		this._formList.splice(oldform.form_pos, 1);
		this._formList.splice(newform.form_pos, 0, newform);
		this._reOrderFormList();
	}

	@action
	updateSpecifyformItem(formItem, recalculatePos = false)
	{
		this._formList.splice(formItem.form_pos, 1, formItem);
		if(recalculatePos)
		{
			this._reOrderFormList();
		}
	}
	@action
	createSpecifyformItem(form)
	{
		this._formList.splice(form.form_pos, 0, form)
	}

	_reOrderFormList = ()=>{
		if(this._formList && this._formList.length > 0)
		{
			this._formList.map((form,index)=>{
				form.form_pos = index;
			})
		}
	}
	@action
	pushFormItem(formItem)
	{
		this._formList.push(formItem)
	}

	@observable _activeTabKey = "record";
	@action _setActiveKey(key)
	{
		if(this._activeTabKey !== key)
		{
			this._activeTabKey = key;
		}
	}
	@computed
	get _getActiveKey()
	{
		return this._activeTabKey;
	}

	@action
	_addRecord(record)
	{
		if(!_.isEmpty(this._recordList))
		{
			this._recordList.splice(0,0, record)
		}
		else
		{
			this._recordList.push(record);
		}
	}
	@action
	_updateRecord(record)
	{
		let recordindex = this._recordList.findIndex(item=>item.patient_id === record.patient_id);
		console.log(recordindex);
		if(recordindex !== -1)
		{
			this._recordList.splice(recordindex, 1,record);
			//this._recordList.splice(recordindex, 0, record);
		}
	}

	@computed
	get _getRecordList()
	{
		return this._recordList
	}


}

export  default new CurrentVariableStore();