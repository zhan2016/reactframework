import React from 'react';
import {Nav,NavItem,Tab} from 'react-bootstrap'
import StructureMainLayout from './StructureView/StructureMainLayout'
class StudyDetailViewLayout extends  React.Component{
	render()
	{
		return (
			<React.Fragment>
				<div>
					<Tab.Container>
					<div className={"studydetailviewNavBar"}>
				<Nav   justify   variant="tabs" defaultActiveKey="#record" activeKey={"record"} onSelect={this._handleSelect}>
					<NavItem eventKey={1} href="/home">
						<Nav.Link href={'#record'}>记录</Nav.Link>
					</NavItem>
					<NavItem eventKey={2} title="Item">
						<Nav.Link href={'#structure'}>结构</Nav.Link>
					</NavItem>
					<NavItem>
						<Nav.Link>表单</Nav.Link>
					</NavItem>
					<NavItem>
						<Nav.Link>用户</Nav.Link>
					</NavItem>
					<NavItem>
						<Nav.Link>痕迹</Nav.Link>
					</NavItem>
					<NavItem>
						<Nav.Link>监察</Nav.Link>
					</NavItem>
					<NavItem>
						<Nav.Link>设置</Nav.Link>
					</NavItem>
				</Nav>
					</div>
				<div className={"studydetailviewContent"}>
					 <Tab.Content>
						 <Tab.Pane eventKey="#record">
							 <StructureMainLayout/>
						 </Tab.Pane>
						 <Tab.Pane eventKey="#structure">
							 结构列表
						 </Tab.Pane>
					 </Tab.Content>
				</div>
					</Tab.Container>
				</div>
			</React.Fragment>
		)
	}
}


export  default  StudyDetailViewLayout;