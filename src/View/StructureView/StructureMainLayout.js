import React from 'react';
import {Row,Col,Button} from 'react-bootstrap';


class  StructureMainLayout extends  React.Component{
	render()
	{
		return(
			<div>
				<Row>
					<Col sm={4}>
						<div>
							Phase
							<Button variant="outline-primary">Add</Button>
						</div>
					</Col>
					<Col sm={8}>
						就是这么牛啊
					</Col>
				</Row>

			</div>
		)
	}

}

export default  StructureMainLayout;