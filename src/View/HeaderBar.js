import React from 'react';
import  {Nav,NavItem,Navbar,NavDropdown} from 'react-bootstrap'
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router";

@inject("AuthStore")
@observer
@withRouter
class  HeaderBar extends  React.Component{
	_handleSelect = (selectedKey)=>{
		console.log(selectedKey);
	}
		render()
		{
			return(
				<React.Fragment>
					<Navbar bg="dark" expand="lg"  variant="dark" className={"justify-content-between"}>
						<Navbar.Brand href="#home">ecrf</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="mr-auto">
								<Nav.Link >首页</Nav.Link>
							</Nav>
								<Nav>
								<Nav.Link href="#link">支持</Nav.Link>
								<NavDropdown title={this.props.AuthStore.getAuthInfo.user.username ? this.props.AuthStore.getAuthInfo.user.username:""} id="basic-nav-dropdown">
									<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
									<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
									<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item onClick={()=>{this.props.AuthStore.setAuth(false); this.props.history.push('/')}}>退出</NavDropdown.Item>
								</NavDropdown>
								</Nav>

						</Navbar.Collapse>
					</Navbar>


				</React.Fragment>
			)
		}
}

export  default  HeaderBar;