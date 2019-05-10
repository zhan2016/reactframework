import React from 'react';
import {Nav,NavItem,Tab,Tabs,Navbar} from 'react-bootstrap'
import StructureMainLayout from './StructureView/StructureMainLayout';
import FormDesigner from './FormView/FormDesigner';
import HeaderBar from './HeaderBar';
import '../css/StudyDetailViewLayout.scss'
import FormShowItem from './FormView/FormShowItem';
import RecordView from './RecordView/RecordView';
import FormListView from './FormView/FormListView';
import {Provider,observer} from 'mobx-react'
import FormStore from "../state/FormStore";
import RecordStore from "../state/RecordStore";
import {inject} from "mobx-react/index";
@inject("CurrentVariable")
@observer
class StudyDetailViewLayout extends  React.Component{
	render()
	{
		return (
			<React.Fragment>
				<Provider FormStore ={FormStore} RecordStore={RecordStore} >
				<div>
					<HeaderBar />
				<div className={"studydetailviewContent"}>
					 <Tabs defaultActiveKey = "record"  justify activeKey={this.props.CurrentVariable._getActiveKey}
								 onSelect={key => this.props.CurrentVariable._setActiveKey(key)}>
						 <Tab eventKey={"record"} title = "记录">
							 <RecordView />
						 </Tab>
						 <Tab eventKey={"structure"} title={"结构"}>
							 <FormListView />
						 </Tab>
						 <Tab eventKey={"form"} title={"表单"}>
							 <FormDesigner />
						 </Tab>
						 <Tab eventKey={"activities"} title={"痕迹"}>
							 <StructureMainLayout />
						 </Tab>
						 <Tab eventKey={"query"} title={"监察"}>
							 <StructureMainLayout />
						 </Tab>
						 <Tab eventKey={"user"} title={"用户"}>
							 <StructureMainLayout />
						 </Tab>
						 <Tab eventKey={"setting"} title={"设置"}>
							 <StructureMainLayout />
						 </Tab>
					 </Tabs>
				</div>
				</div>
				</Provider>
			</React.Fragment>
		)
	}
}


export  default  StudyDetailViewLayout;