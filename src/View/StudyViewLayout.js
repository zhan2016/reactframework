import React from 'react';
import  {Button} from 'react-bootstrap'

class  StudyViewLayout extends  React.Component{
	render()
	{
			return(
				<div>
					<div>
					<div>
						<h1>我的研究</h1>
						<p>在这里，可以浏览你的所有研究. 可以单击进入研究或者点击新建研究</p>
					</div>
					<div>
						<Button variant="primary">新建研究</Button>
					</div>
					</div>
					<div className={"content"}>
						<div className={"searchToolbar"}>
								搜索吧
						</div>
						<div>
							检查列表
						</div>
					</div>
				</div>
			)
	}

}

export default  StudyViewLayout;