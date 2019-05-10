import React, {Component} from 'react';
import {Button, ButtonToolbar, OverlayTrigger, Tooltip} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faPencilAlt, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {textFilter} from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import {inject, observer} from "mobx-react";
import {observable} from "mobx";
import {getRecordDetail} from "../../axios/RecordAPI";
import HashHistory from "../BrowserHistory";
import '../../css/RecordList.scss'

@inject("RecordStore","AuthStore","CurrentVariable")
@observer
class RecordList extends Component {
    constructor(props)
    {
        super(props)
        this._handleTableChange = this._handleTableChange.bind(this);
    }

    @observable _page = 1;
    @observable _sizePerPage = 10;

    _handleTableChange = (type, { page, sizePerPage, filters, sortField, sortOrder, cellEdit }) => {

    }

    _addRecord =()=>{
        this.props.RecordStore._ShowModalWithInit();
    }
    _editClick = (patientid)=>{
        getRecordDetail({id:patientid}).then(data=>{
            this.props.RecordStore. _ShowModalWithInit(data)
        })

    };
    _LoadRecord = ()=>{

    }
    _getcolumns = ()=>{
        return[{
            dataField: 'patient_selfid',
            text: '病人编号',
            sort: true
        }, {
            dataField: 'patient_name',
            text: '病人姓名',

            sort: true
        }, {
            dataField: 'operator',
            text: '操作',
            isDummyField: true,
            formatter: (cellContent, row) => {
                return(
                    <div className={"buttonList"}>
                        <OverlayTrigger  placement="top" overlay={<Tooltip id={`tooltip-modify`}>
                            修改信息
                        </Tooltip>}>
                        <Button onClick={()=>{this._editClick(row.patient_id)}} variant="outline-dark"><FontAwesomeIcon icon={faPencilAlt}/></Button>
                        </OverlayTrigger>
                        <OverlayTrigger  placement="top" overlay={<Tooltip id={`tooltip-modify`}>
                            录入
                        </Tooltip>}>
                        <Button onClick={()=>{this.props.RecordStore._setCurrentRecord(row); HashHistory.push('/studydetail/recordformdetail');}} variant="outline-dark"><FontAwesomeIcon icon={faEye}/></Button>
                        </OverlayTrigger>
                        <OverlayTrigger  placement="top" overlay={<Tooltip id={`tooltip-modify`}>
                           删除
                        </Tooltip>}>
                        <Button variant="outline-dark"><FontAwesomeIcon icon={faTrash}/></Button>
                        </OverlayTrigger>
                    </div>
                )
            }
        }];
    }
    render() {

        const defaultSorted = [{
            dataField: 'name',
            order: 'desc'
        }];
        const selectRow = {
            mode: 'checkbox',
            clickToSelect: false,
            style: { backgroundColor: '#c8e6c9' }
        };
        const  RemoteAll =  ({ data, page, sizePerPage, onTableChange, totalSize }) => (
            <div>
                <BootstrapTable
                    remote
                    keyField="patient_id"
                    data={ data}
                    columns={ this._getcolumns() }
                    defaultSorted={ defaultSorted }
                    filter={ filterFactory() }
                    pagination={ paginationFactory({ page, sizePerPage, totalSize }) }
                    selectRow={ selectRow }
                    onTableChange={ onTableChange }
                />
            </div>
        );
        let patientList = this.props.CurrentVariable._getRecordList;
        return (
            <div>
                <React.Fragment>
                    <div className={"searchContaner"}>
                        <ButtonToolbar>
                            <Button onClick={this._addRecord}><FontAwesomeIcon icon={faPlus} /></Button>
                        </ButtonToolbar>
                    </div>
                    <div className={"quickfilterContainer"}>
                    </div>
                    <div className={"recordlistContainer"}>
                        {
                            patientList && patientList.length > 0 ?(<RemoteAll
                                data={ patientList }
                                page={ this._page }
                                sizePerPage={ this._sizePerPage }
                                totalSize={ 1 }
                                onTableChange={ this._handleTableChange }
                            />):null
                        }

                    </div>
                    <div className={"recordlistFotter"}>

                    </div>
                </React.Fragment>
            </div>
        );
    }
}

export default RecordList;