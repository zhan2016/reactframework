import React from 'react';
import {Nav,NavItem,Tab,Tabs} from 'react-bootstrap'
import StructureMainLayout from './StructureView/StructureMainLayout';
import FormMainLayout from './FormView/FormMainLayout';
import HeaderBar from './HeaderBar';
import '../css/StudyDetailViewLayout.scss'
class StudyDetailViewLayout extends  React.Component{
	render()
	{
		return (
			<React.Fragment>
				<div>
					<HeaderBar />
				<div className={"studydetailviewContent"}>
					 <Tabs defaultActiveKey = "record"  justify>
						 <Tab eventKey={"record"} title = "记录">
							 <StructureMainLayout />
						 </Tab>
						 <Tab eventKey={"structure"} title={"结构"}>
							 <FormMainLayout />
						 </Tab>
						 <Tab eventKey={"form"} title={"表单"}>
							 <StructureMainLayout />
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
			</React.Fragment>
		)
	}
}


export  default  StudyDetailViewLayout;