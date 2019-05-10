import React, { Component } from 'react';
import '../../css/RecordList.scss';
import {inject, observer} from 'mobx-react';
import RecordModal from './RecordModal'
import {Redirect, Route,Router} from "react-router";
import AuthStore from "../../state/AuthStore";
import RecordList from './RecordList'
import createHashHistory from "../BrowserHistory";
import RecordFormDetail from './RecordFormDetail'

@inject("RecordStore","AuthStore","CurrentVariable")
@observer
class RecordView extends Component {
  render() {
    return (
      <div className="recordlistContainer">
          <Router  history={createHashHistory}>
              <Route exact path="/studydetail" render={() => (
                  !this.props.AuthStore.isAuth ?  (<Redirect to={"/"}/>):  (<RecordList />)
              )}/>
                  <Route  path="/studydetail/recordformdetail" render={() => (
                      !this.props.AuthStore.isAuth ?  (<Redirect to={"/"}/>):  (<RecordFormDetail />)
                  )}/>
          </Router>
          <RecordModal />
      </div>
    );
  }
}

export default RecordView;
