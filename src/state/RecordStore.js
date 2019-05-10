import {observable,action,computed} from 'mobx';
import _ from 'lodash';
import {getFormDetail} from '../axios/FormAPI';
import {getFormDataList,getFormDataDetail} from '../axios/RecordFormAPI';
import currentVariableStore from './CurrentVariableStore'

class RecordStore {
    @observable _recordModalVisible = false;
    @observable _recordModalInit = {};
    @observable _currentRecord = {};
    @observable _currentFormDataList = {};
    @observable _currenteditForm = undefined;
    @observable _currenteditFormDataId = undefined;
    @observable _currentFormSource;
    @observable _currentDataSource;
    @observable _previosBtnEnable = false;
    @observable _nextBtnEnable = false;
    @action
    _changeFieldModalVisible(visibleStatus)
    {
        if(this._recordModalVisible !== visibleStatus)
        {
            this._recordModalVisible = visibleStatus
        }
    }
    @computed
    get _getModalVisible()
    {
        return this._recordModalVisible;
    }
    @action
    _ShowModalWithInit(modalInit = {})
    {
        this._recordModalVisible = true;
        this._recordModalInit = modalInit;

    }
    @computed
    get _getModalInit()
    {
        return this._recordModalInit;
    }
    @action
    _setCurrentRecord(record)
    {
        if(!_.isEqual(record, this._currentRecord))
        {
            this._currentRecord = record;
            getFormDataList({patient_id:record.patient_id}).then(data=>{
                this._currentFormDataList = data;
            });
             this._setCurrentForm(undefined);
             let  recordindex = this._getRecordIndex(this._currentRecord);
             this._updateBtnStatus(recordindex);
        }
    }
    @computed
    get _getCurrentRecord()
    {
        return this._currentRecord;
    }
    @action
    _setCurrentForm(form)
    {

        if(!_.isEqual(this._currenteditForm, form))
        {
            if(form === undefined)
            {
                this._currentFormSource = {};
                this._currenteditFormDataId = undefined;
                this._currentDataSource = {};
                this._currenteditForm = form;
                return
            }
            this._currenteditForm = form;
            getFormDetail({id:form.form_id}).then((data)=>{
                //.log('获取到了嘛 : ' + data)
                if(!_.isEmpty(data.form_attrs))
                {
                   // console.log(data.form_attrs)
                    this._currentFormSource = JSON.parse(data.form_attrs);
                   // console.log("no problem")

                    if(_.isEmpty(this._currentFormDataList))
                    {
                        this._currenteditFormDataId = undefined;
                        return;
                    }
                    let formdataindex = form.repeatable ? this._currentFormDataList.findIndex(item => item.form_id === form.form_id && item.isdefault) : this._currentFormDataList.findIndex(item => item.form_id === form.form_id);
                    //console.log(formdataindex);
                    if(formdataindex !== -1)
                    {
                        this._currenteditFormDataId = this._currentFormDataList[formdataindex].data_id;
                        getFormDataDetail({id: this._currenteditFormDataId}).then(data=>{
                           // console.log(data);
                            this._currentDataSource = JSON.parse(data.form_data);
                        })
                    }
                    else
                    {
                        this._currenteditFormDataId = undefined;
                        this._currentDataSource = {};

                    }
                }
                else
                {
                    this._currentFormSource = {};
                    this._currenteditFormDataId = undefined;
                    this._currentDataSource = {};
                }
            })
        }
    }
    @computed
    get _getCurrentForm()
    {
        return this._currenteditForm;
    }
    @computed
    get _getCurrentFormSource()
    {
        return this._currentFormSource;
    }
    @computed
    get _getCurrentDataSource()
    {
        return this._currentDataSource
    }
    @computed
    get _getCurrentFormDataID()
    {
        return this._currenteditFormDataId;
    }
    @action
    _setCurrentFormDataID(dataid)
    {
        if(!_.isEqual(this._currenteditFormDataId, dataid))
        {
            this._currenteditFormDataId = dataid
        }
    }
    @action
    _setCurrentDataSource(formdataSource)
    {
        if(!_.isEqual(this._currentDataSource, formdataSource))
        {
            this._currentDataSource = JSON.parse(formdataSource)
        }
    }
    @computed
    get _getformdataList()
    {
        return this._currentFormDataList
    }
    @action
    _previousRecord()
    {
        let currentRecordIndex = this._getRecordIndex(this._currentRecord);
        if(currentRecordIndex !== -1)
        {
            let record = this._safeGetRecordByIndex(currentRecordIndex - 1);
            if(record) {
                this._setCurrentRecord(record);
            }
            //this._updateBtnStatus(currentRecordIndex - 1)
        }
    }
    @action
    _nextRecord()
    {
        let currentRecordIndex = this._getRecordIndex(this._currentRecord);
        if(currentRecordIndex !== -1)
        {
            let record = this._safeGetRecordByIndex(currentRecordIndex + 1);
            if(record) {
                this._setCurrentRecord(record);
            }
           // this._updateBtnStatus(currentRecordIndex + 1)
        }
    }
    _safeGetRecordByIndex(index)
    {
        let recordList = currentVariableStore._recordList;
        if(recordList && (index >= 0 && index <= recordList.length - 1))
        {
            return recordList[index];
        }
        return undefined;
    }
    _getRecordIndex(record)
    {
        let recordList = currentVariableStore._recordList;
        if(recordList && recordList.length > 0 && !_.isEmpty(record))
        {
            return recordList.findIndex(item => item.patient_id === record.patient_id);
        }
        else
        {
            return -1;
        }
    }
    _updateBtnStatus(index)
    {
        let recordList = currentVariableStore._recordList;
        console.log(`index:${index}  count:${recordList.length}`);
        if(index < 0 || !recordList || recordList.length === 0)
        {
            this._previosBtnEnable = false;
            this._nextBtnEnable = false;
            return;
        }
        let recordCount = recordList.length;
        if(index === 0 && recordCount === 1)
        {
            this._previosBtnEnable = false;
            this._nextBtnEnable = false;
            return;
        }
        if(index === 0)
        {
            this._previosBtnEnable = false;
            this._nextBtnEnable = true;
            return;
        }
        if(index === recordCount - 1)
        {
            this._previosBtnEnable = true;
            this._nextBtnEnable = false;
            return;
        }
        this._previosBtnEnable = true;
        this._nextBtnEnable = true;
    }

}

export  default  new RecordStore();