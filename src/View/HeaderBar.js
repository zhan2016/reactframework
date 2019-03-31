import React from 'react';
import  {Nav,NavItem,Navbar,NavDropdown} from 'react-bootstrap'

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
								<Nav.Link href="#home">首页</Nav.Link>
							</Nav>
								<Nav>
								<Nav.Link href="#link">支持</Nav.Link>
								<NavDropdown title="张三" id="basic-nav-dropdown">
									<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
									<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
									<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
								</NavDropdown>
								</Nav>

						</Navbar.Collapse>
					</Navbar>


				</React.Fragment>
			)
		}
}

export  default  HeaderBar;