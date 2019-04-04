import React from 'react';
import {Row,Col,Button,Form,Modal} from 'react-bootstrap';
import { Provider,observer} from "mobx-react";
import StructureStore from '../../state/StructureStore'
import '../../css/structmainlayout.scss';
import PhaseView from './PhaseView';

import StepView from './StepView';
var structureStore = new 	StructureStore();
@observer
class  StructureMainLayout extends  React.Component{
	render()
	{
		return(
			<Provider StructStore = {structureStore}>
			<div>
				<Row>
					<Col sm={4}>

						<div>
							<PhaseView />
						</div>

					</Col>
					<Col sm={8}>
						<StepView />
					</Col>
				</Row>

			</div>
			</Provider>
		)
	}

}

export default  StructureMainLayout;