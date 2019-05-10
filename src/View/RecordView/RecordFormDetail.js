import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {faBackward,faForward, faLevelUpAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import HashHistory from "../BrowserHistory";
import '../../css/RecordFormDetail.scss';
import {ButtonGroup,Button,ProgressBar,Badge,OverlayTrigger,Tooltip} from 'react-bootstrap';
import FormShowItem from '../FormView/FormShowItem';
import _ from 'lodash';
@inject("CurrentVariable","RecordStore","FormStore")
@observer
class RecordFormDetail extends Component {
    _repetableMarkAndNum = (formitem) => {
        if(!formitem.repeatable)
        {
            return null;
        }
        let number;
        let formdatalist = this.props.RecordStore._getformdataList;
        if(_.isEmpty(formdatalist))
        {
            number = 0;
        }
        else
        {
            let formdatalistFilter = formdatalist.filter(item => item.form_id === formitem.form_id);
            number = formdatalistFilter.length;
        }
        return <Badge pill  variant="dark">{number}</Badge>
    }
    _getTabComponnet = ()=>{
        let fromList = this.props.CurrentVariable._getFormList;
        return (
            <ButtonGroup className={"btngroup"}>
                {
                    fromList &&  fromList.length > 0 ? fromList.map(item => {
                     //   console.log(this.props.RecordStore._getCurrentForm);
                       return <Button key={item.form_id} onClick={()=> this.props.RecordStore._setCurrentForm(item)} className={`${this.props.RecordStore._getCurrentForm&& this.props.RecordStore._getCurrentForm.form_id === item.form_id ? "currentselect":""}`} variant="light">
                          {item.form_name}  {item.repeatable ? this._repetableMarkAndNum(item):null}
                       </Button>
                    }) : null
                }
            </ButtonGroup>
        )
    }
    render() {
        return (
            <div className={"baseContainer"}>
                <div className={"recordformdetailcontent"}>
                    <div className={"recordformlefttab"}>
                        <div className={"patientSimpleInfo"}>
                            <div className={"patientInfo"}>
                                记录:<strong>{this.props.RecordStore._getCurrentRecord.patient_name}</strong>
                                <div  className={"data-entry-progress"}>
                                    <div  className={"data-entry-progresscontent"}>
                                    进度:<ProgressBar now={60} label={`${60}%`}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"navigatorbar"}>
                        {this._getTabComponnet()}
                        </div>
                        <div className={"recordformdetailToolBar"}>
                            <OverlayTrigger  placement="top" overlay={<Tooltip id={`tooltip-back`}>
                                返回病人列表
                            </Tooltip>}>
                            <Button variant="outline-dark"  onClick ={()=>{HashHistory.push('/studydetail');}}><FontAwesomeIcon icon={faLevelUpAlt} /></Button>
                            </OverlayTrigger>
                            <OverlayTrigger  placement="top" overlay={<Tooltip id={`tooltip-backward`} >
                                上一个病人
                            </Tooltip>}>
                            <Button variant="outline-dark" onClick={()=>{this.props.RecordStore._previousRecord()}} disabled={!this.props.RecordStore._previosBtnEnable}><FontAwesomeIcon icon={faBackward} /></Button>
                            </OverlayTrigger>
                            <OverlayTrigger  placement="top" overlay={<Tooltip id={`tooltip-forward`}>
                                下一个病人
                            </Tooltip>}>
                            <Button variant="outline-dark" onClick={()=>{this.props.RecordStore._nextRecord()}}  disabled={!this.props.RecordStore._nextBtnEnable}><FontAwesomeIcon icon={faForward} /></Button>
                            </OverlayTrigger>
                        </div>
                    </div>
                    <div className={"recordRightContent"}>
                        <FormShowItem />
                    </div>
                </div>

            </div>
        );
    }
}

export default RecordFormDetail;