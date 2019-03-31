import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Row,Col,Tab,Container} from 'react-bootstrap'
import HeaderBar from './View/HeaderBar';
import StudyViewLayout from './View/StudyViewLayout'
import StudyDetailViewLayout from './View/StudyDetailViewLayout';
import {observer} from 'mobx-react'

@observer
class App extends Component {
  render() {
    return (
      <div className="App">
				<Container>
					<HeaderBar/>
					<StudyDetailViewLayout/>
				</Container>
      </div>
    );
  }
}

export default App;
