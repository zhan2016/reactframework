import React, {Component} from 'react';
import {Modal,Button} from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import {inject, observer} from "mobx-react";
import {observable} from 'mobx'
import _ from 'lodash';
import {createFormData,updateFormData} from '../../axios/RecordFormAPI'
@inject("CurrentVariable","RecordStore","FormStore")
@observer
class RepeatFormModal extends Component {
    @observable _selectItemID;
    _getData = ()=>{
        let formdatalist = this.props.RecordStore._getformdataList;
        if(_.isEmpty(formdatalist))
        {
            return [];
        }
        let currentform = this.props.RecordStore._getCurrentForm;
        if(_.isEmpty(currentform))
        {
            return [];
        }
        return formdatalist.filter(item => item.form_id === currentform.form_id);
    }
    _addrepeatElement = ()=>{
        let dataid = this.props.RecordStore._getCurrentFormDataID;
        let patientid = this.props.RecordStore._getCurrentRecord.patient_id;
        let formid = this.props.RecordStore._getCurrentForm.form_id;
        let isdefault = true;
        let postdata = {
            patient_id:patientid,
            form_id: formid,
            isdefault:isdefault,
            form_data:JSON.stringify({})
        }
        createFormData(postdata).then(data=>{
            this._selectItemID = data.data_id;
            if(dataid === undefined)
            {
                let formdatalist = this.props.RecordStore._currentFormDataList;
                formdatalist.push(data);
                this.props.RecordStore._setCurrentDataSource(data.form_data);
                this.props.RecordStore._setCurrentFormDataID(data.data_id);
                return;
            }
            updateFormData(dataid,{isdefault:false}).then((updatedata)=>{
                let formdatalist = this.props.RecordStore._currentFormDataList;
                let index = formdatalist.findIndex(item=> item.data_id === updatedata.data_id);
                if(index !== -1)
                {
                    formdatalist.splice(index, 1, updatedata);
                }
                formdatalist.push(data);
                this.props.RecordStore._setCurrentFormDataID(data.data_id);
                this.props.RecordStore._setCurrentDataSource(data.form_data);
            })

        })
    };
    _handleSelect = (row,isselect)=>{
        if(isselect)
        {
                this._selectItemID = row.data_id;
                console.log(`切换了的啊${this._selectItemID}`)
        }

    }
    _saveClick = ()=>{
        if(_.isEqual(this._orignalID,this._selectItemID) || this._orignalID === undefined)
        {
            //console.log('直接关闭了啊' + this._orignalID);
            this.props.onsave();
            return
        }
        updateFormData(this._orignalID,{isdefault:false}).then((originalselect)=>{
            updateFormData(this._selectItemID,{isdefault:true}).then(currentselect =>{
                let formdatalist = this.props.RecordStore._currentFormDataList;
                let index = formdatalist.findIndex(item=> item.data_id === originalselect.data_id);
                if(index !== -1)
                {
                    formdatalist.splice(index, 1, originalselect);
                }
                 index = formdatalist.findIndex(item=> item.data_id === currentselect.data_id);
                if(index !== -1)
                {
                    formdatalist.splice(index, 1, currentselect);
                }
                this.props.RecordStore._setCurrentDataSource(currentselect.form_data);
                this.props.RecordStore._setCurrentFormDataID(currentselect.data_id);
                this.props.onsave();
            })

        })
    }
    render() {
        let {visible, onsave, onclose} = this.props;
        let data = this._getData();
        let selected = [];
        if(!_.isEmpty(data))
        {
            let selectedfind = data.filter(item => item.isdefault === true);
            if(!_.isEmpty(selectedfind))
            {
                selected.push(selectedfind[0].data_id);
                this._orignalID = selectedfind[0].data_id;
//                console.log(`重新渲染了${this._orignalID}`);
                //console.log(`${JSON.stringify(data)}`)

            }

        }
        const columns = [
            {
            dataField: 'patient_id',
            text: '病人自定义ID'
         },
            {
            dataField: 'status',
            text: '状态'
        },
            {
                dataField: 'create_time',
                text: '创建时间'
            }];
        const selectRow = {
            mode: 'radio',
            clickToSelect: true,
            selected:selected,
            onSelect:this._handleSelect
        };
        return (
            <div>
                <Modal show={visible} onHide={onclose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{`重复事件管理`}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                        <BootstrapTable
                            keyField='data_id'
                            data={ this._getData() }
                            columns={ columns }
                            selectRow={ selectRow }
                        />
                        </div>
                        <div>
                            <Button onClick={this._addrepeatElement}>添加</Button>
                            <Button>删除选中</Button>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onclose}>取消</Button>
                        <Button variant="primary" onClick={this._saveClick}>确定</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default RepeatFormModal;