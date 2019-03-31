import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from 'react-bootstrap';
import {observable} from 'mobx'
import {observer} from 'mobx-react'

@observer
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
					<Button type="button" class="close" data-dismiss="alert" aria-label="Close">第一个按钮</Button>
        </header>
      </div>
    );
  }
}

export default App;
