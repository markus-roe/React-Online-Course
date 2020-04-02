import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Form, NavDropdown, Button } from 'react-bootstrap';
import Logout from './Logout';
// import { LinkContainer } from 'react-router-bootstrap';
// import jwt_decode from 'jwt-decode';

const NavBar = () => {
	// let name = '';
	// if (localStorage.usertoken) {
	// 	const token = localStorage.usertoken;
	// 	const decoded = jwt_decode(token);
	// 	name = decoded.first_name + ' ' + decoded.last_name;
	// }

	const loginRegLogout = (
		<ul className="navbar-nav">
			<li className="nav-item">
				<Link to="/login" className="nav-link">
					Login
				</Link>
			</li>
			<li className="nav-item">
				<Link to="/register" className="nav-link">
					Register
				</Link>
			</li>
			<li className="nav-item">
				<Link to="#" onClick={Logout} className="nav-link">
					Logout
				</Link>
			</li>
		</ul>
	);

	// const logoutProfLink = (
	// 	<ul className="navbar-nav">
	// 		<NavDropdown title={name} id="basic-nav-dropdown" alignRight>
	// 			<LinkContainer to="/profile">
	// 				<NavDropdown.Item>Profile</NavDropdown.Item>
	// 			</LinkContainer>
	// 			<LinkContainer to="/support">
	// 				<NavDropdown.Item>Support</NavDropdown.Item>
	// 			</LinkContainer>
	// 			<NavDropdown.Divider />
	// 			<NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
	// 		</NavDropdown>
	// 	</ul>
	// );

	return (
		<Navbar bg="primary" variant="dark">
			<Navbar.Brand>B2 Online Kurs</Navbar.Brand>
			<Nav className="mr-auto">
				<a href="/" className="nav-link">
					Home
				</a>
				<a href="/secret" className="nav-link">
					Secret
				</a>
				<a href="/restricted" className="nav-link">
					Restricted
				</a>
			</Nav>

			<Form>
				{loginRegLogout}
				{/* {localStorage.usertoken ? logoutProfLink : loginRegLink} */}
				{/* Search Component:
				<FormControl type="text" placeholder="Search" className="mr-sm-2" />
				<Button variant="outline-light">Search</Button> */}
			</Form>
		</Navbar>
	);
};

export default NavBar;
