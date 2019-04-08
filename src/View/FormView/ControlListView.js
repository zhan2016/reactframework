import React, {Component} from 'react';
import {ListGroup} from 'react-bootstrap';
import '../../css/ControlListView.scss';
import FieldModal from './FieldModal';
import {inject, observer} from "mobx-react";

const buttonList =[
    {
        label:'数字',
        icon:'',
        id:'Number'
    },
    {
        label:'单选按钮',
        icon:'',
        id:'Radio'
    },
    {
        label:'下拉列表',
        icon:'',
        id:'Dropdown'
    },
    {
        label:'复选框',
        icon:'',
        id:'Checkboxes'
    },
    {
        label:'日期',
        icon:'',
        id:'Date'
    },
    {
        label:'分割',
        icon:'',
        id:'Grid'
    },
    {
        label:'年',
        icon:'',
        id:'Year'
    },
    {
        label:'时间',
        icon:'',
        id:'Time'
    },
    {
        label:'计算',
        icon:'',
        id:'Calculation'
    },
    {
        label:'进度条',
        icon:'',
        id:'Slider'
    },
    {
        label:'标签',
        icon:'',
        id:'Remark'
    },
    {
        label:'总结',
        icon:'',
        id:'Summary'
    },
    {
        label:'文本框',
        icon:'',
        id:'Text'
    },
    {
        label:'上传文件',
        icon:'',
        id:'Upload'
    },
    {
        label:'图片',
        icon:'',
        id:'Image'
    },

]

@inject("FormStore")
@observer
class ControlListView extends Component {
    _newFieldClick =()=>{

    }

    render() {
        return (
            <div>
                <div className={"formleftbutton"}>
                    字段列表
                </div>
                <div>
                    <ListGroup>
                        {
                            buttonList.map(button=>{
                                return <ListGroup.Item className={"controllistitem"} onClick={()=>{this.props.FormStore._ShowModalWithFieldClick(button.id)}}>
                                    <span>{button.icon}</span>
                                    <span>{button.label}</span>
                                </ListGroup.Item>
                            })
                        }
                    </ListGroup>
                </div>
                <FieldModal />
            </div>
        );
    }
}

export default ControlListView;