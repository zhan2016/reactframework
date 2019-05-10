import React from 'react';
import  {Button,FormControl,ListGroup} from 'react-bootstrap';
import {observable} from 'mobx';
import {inject,Provider, observer} from 'mobx-react'
import HeaderBar from './HeaderBar';
import '../css/StudyViewLayout.scss';
import StudyModal from "./StudyView/StudyModal";
import {studyList, getStudyDetail, updateStudy, delStudy} from '../axios/StudyAPI';
import  LO from 'lodash';
import HashHistory from '../View/BrowserHistory';


@inject("AuthStore","CurrentVariable")
@observer
class  StudyViewLayout extends  React.Component{
	@observable _newModalVisible = false;
	_handleModalClose = ()=>{
		this._newModalVisible = false;
	}
	@observable studylist = [];
	componentDidMount() {
		studyList({id:this.props.AuthStore.getUserID}).then((data)=>{
			if(!LO.isEqual(data, this.studylist))
			{
				this.studylist = LO.cloneDeep(data);
			}
		})
	}
	_studyAdd = ()=>{
		studyList({id:this.props.AuthStore.getUserID}).then((data)=>{
			if(!LO.isEqual(data, this.studylist))
			{
				this.studylist = LO.cloneDeep(data);
			}
		})
	}

	render()
	{
		console.log(`rerender`);
			return(
				<div>
					<HeaderBar />
					<div >
						<div className={"studyviewContainer"}>
							<div className={"leftdes"}>
								<h1>我的研究</h1>
								<p>在这里，可以浏览你的所有研究. 可以单击进入研究或者点击新建研究</p>
							</div>
							<div className={"rightbtn"}>
								<Button variant="primary" onClick={()=>{ console.log(this._newModalVisible);this._newModalVisible= true}}>新建研究</Button>
							</div>
						</div>
					</div>
					<div className={"content"}>
						<div className={"searchToolbar"}>
								<div className={"leftfilter"}>
									<span className={"filterspan"}>
										搜索研究名
									</span>
									<FormControl
										placeholder=""
										aria-label=""
										aria-describedby="basic-addon1"
									/>
								</div>
								<div className={"rightsort"}>
									<span className={"rightspan"}>排序</span>
									<FormControl as="select">
										<option>创建日期</option>
										<option>研究名称</option>
									</FormControl>
								</div>
						</div>
						<div>
							{this.studylist && this.studylist.length > 0 ?(<div>
								<ListGroup>
									{
										this.studylist.map(study=>{
											return (
												<ListGroup.Item action variant="light" onClick={()=>{HashHistory.push('/studydetail'); this.props.CurrentVariable.setCurrentStudyId(study.study_id)}}>
													<div className={'listcontainer'}>
														<div className={"leftinfo"}>
															{study.study_name}
														</div>
														<div className={"rightoperator"} onClick={()=>{console.log(`show all records`)}}>
															所有记录
														</div>
													</div>
												</ListGroup.Item>
											)
										})
									}
								</ListGroup>
							</div>):null}
						</div>
					</div>
					<StudyModal  Show={this._newModalVisible}  handleClose={this._handleModalClose} onaddStudy = {this._studyAdd}/>
				</div>
			)
	}
}

export default  StudyViewLayout;