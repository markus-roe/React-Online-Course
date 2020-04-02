import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import withAuth from './withAuth';
import Home from './Home';
import Secret from './Secret';
import Register from './Register';
import Login from './Login';
import Restricted from './Restricted';

const App = () => {
	return (
		<div>
			<Navbar />
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/secret" component={withAuth(Secret)} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/restricted" component={Restricted} />
			</Switch>
		</div>
	);
};

export default App;
