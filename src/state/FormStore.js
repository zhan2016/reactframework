import {observable,action,computed} from 'mobx';
import _ from 'lodash';
import {getFormDetail} from '../axios/FormAPI'

class FormStore {
  @observable _filedModalVisible = false;
  @observable _currentDesignForm = {};
  @observable _formModalInit = {}
  @action
  _changeFieldModalVisible(visibleStatus)
  {
    if(this._filedModalVisible !== visibleStatus)
    {
        this._filedModalVisible = visibleStatus
    }
  }
  @computed
    get _getModalVisible()
  {
      return this._filedModalVisible;
  }
  @action
  _ShowModalWithInit(modalInit = {})
  {
    this._filedModalVisible = true;
    this._formModalInit = modalInit;

  }
  @computed
	get _getModalInit()
	{
		return this._formModalInit;
	}
  @action _setCurrentDesignForm(form_id)
	{
		if(!form_id)
		{
			return
		}
		if(this._currentDesignForm &&  (Object.keys(this._currentDesignForm).length !== 0 && this._currentDesignForm.form_id === form_id))
		{
				return;
		}
		getFormDetail({id:form_id}).then(formdata=>{
			this._currentDesignForm = formdata;
		})
	}
	@computed
	get _getCurrentDesignForm()
	{
		return this._currentDesignForm;
	}
}

export  default  new FormStore();