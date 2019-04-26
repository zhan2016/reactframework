import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Row,Col,Tab,Container} from 'react-bootstrap'

import StudyViewLayout from './View/StudyViewLayout'
import StudyDetailViewLayout from './View/StudyDetailViewLayout';
import { Router, Route, Redirect } from 'react-router';
import createHashHistory from './View/BrowserHistory'
import {observer, Provider} from 'mobx-react'
import LoginView from "./View/LoginView";
import AuthStore from './state/AuthStore';
import RegisterView from './View/RegisterView'

//let authstore = new AuthStore();
//const history = createHashHistory();
@observer
class App extends Component {
  render() {
    return (
        <Provider AuthStore = {AuthStore}>
            <Router  history={createHashHistory}>
              <div className="App">
                        <Container>
                            <Route exact path="/" component={LoginView}/>
                            <Route exact path="/register" component={RegisterView}/>
                            <Route  path="/study" render={() => (
                                !AuthStore.isAuth ?  (<Redirect to={"/"}/>):  (<StudyViewLayout />)
                            )}/>
                            <Route  path="/studydetail" render={() => (
                                !AuthStore.isAuth ?  (<Redirect to={"/"}/>):  (<StudyDetailViewLayout />)
                            )}/>
                        </Container>
                </div>
            </Router>
        </Provider>
    );
  }
}

export default App;
