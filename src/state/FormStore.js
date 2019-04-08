import {observable,action,computed} from 'mobx';
import _ from 'lodash'

class FormStore {
  @observable _filedModalVisible = false;
  @observable _chooseFieldType;
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
  _ShowModalWithFieldClick(choosefieldType)
  {
    this._filedModalVisible = true;
    this._chooseFieldType = choosefieldType;
  }

}

export  default  FormStore;