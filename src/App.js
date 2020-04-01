import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import withAuth from "./withAuth";
import Home from "./Home";
import Secret from "./Secret";
import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";

const App = () => {
	return (
		<div>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/secret">Secret</Link>
				</li>
				<li>
					<Link to="/login">Login</Link>
				</li>
				<li>
					<Link to="/register">Register</Link>
				</li>
				<li>
					<button onClick={Logout}>Logout</button>
				</li>
			</ul>

			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/secret" component={withAuth(Secret)} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
			</Switch>
		</div>
	);
};

export default App;
